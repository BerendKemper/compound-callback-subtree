"use strict";
const fs = require("fs");
const { Stats } = fs;
const _path = require("path");
/**@callback returnTree @param {object} tree*/
/**@callback nextBranch @param {object|undefined} nextBranch*/
/**@callback statsCallback @param {{path:string branch:object stats:fs.Stats}} branchData @param {function} callback*/
/**@callback subBranchCallback @param {{path:string dirpath:string file:string dirbranch:object}} @param {nextBranch} nextBranch @param {function} blockBranch*/
class CompoundCallbackSubtree {
    #queue = [];
    #counter = null;
    #tree = null;
    #onError(error) {
        for (const callback of this.#queue)
            callback(error, null);
        this.#queue = [];
    };
    /**@param {{dirStatsCb:statsCallback fileStatsCb:statsCallback subBranchCb:subBranchCallback}} options*/
    constructor(options = {}) {
        if (typeof options?.dirStatsCb === "function")
            this.dirStatsCb = options.dirStatsCb;
        if (typeof options?.fileStatsCb === "function")
            this.fileStatsCb = options.fileStatsCb;
        if (typeof options?.subBranchCb === "function")
            this.subBranchCb = options.subBranchCb;
    };
    /**Get a Tree from all the (sub) files and folders from a basePath
     * @param {String} basePath @param {returnTree} callback*/
    fromPath(path, callback = console.log) {
        this.#counter = 1;
        const branch = this.#tree = {};
        this.#queue.push(callback);
        const branchData = { path, branch };
        const clearCallstackOnTreeFinished = () => {
            if (--this.#counter === 0) {
                for (const callback of this.#queue)
                    callback(null, branch);
                this.#queue = [];
            }
        };
        const subBranch = (path, branchData) => {
            fs.stat(path, (error, stats) => {
                if (error !== null)
                    this.#onError(error);
                branchData.stats = stats;
                if (stats.isDirectory())
                    this.dirStatsCb(branchData, () => {
                        fs.readdir(path, (error, files) => {
                            if (error !== null)
                                this.#onError(error);
                            this.#counter += files.length;
                            for (const file of files) {
                                const nextpath = _path.join(path, file);
                                const nextBranchData = { path: nextpath, dirpath: path, file, dirbranch: branchData.branch };
                                this.subBranchCb(nextBranchData, nextbranch => {
                                    const branch = nextBranchData.dirbranch[file] = nextbranch ?? {};
                                    nextBranchData.branch = branch;
                                    subBranch(nextpath, nextBranchData);
                                }, clearCallstackOnTreeFinished);
                            };
                            clearCallstackOnTreeFinished();
                        });
                    });
                else if (stats.isFile())
                    this.fileStatsCb(branchData, clearCallstackOnTreeFinished);
            });
        };
        subBranch(path, branchData);
    };
    /**Get the Tree that was returned from the previous call to fromPath.
     * @param {returnTree} callback*/
    fromCache(callback = console.log) {
        if (this.#counter === null)
            callback(new Error("nothing in cache..."), null);
        if (this.#counter === 0)
            callback(null, this.#tree);
        else
            this.#queue.push(callback);
    };
    /**@param {{path:string branch:object stats:fs.Stats}} branchData @param {function} callback*/
    dirStatsCb(branchData, callback = callbackFailure) {
        callback();
    };
    /**@param {{path:string branch:object stats:fs.Stats}} branchData @param {function} callback*/
    fileStatsCb(branchData, callback = callbackFailure) {
        callback();
    };
    /**@param {{path:string dirpath:string file:string dirbranch:object}} @param {nextBranch} nextBranch @param {function} blockBranch*/
    subBranchCb(branchData, nextBranch = callbackFailure, blockBranch) {
        nextBranch();
    };
};
module.exports = CompoundCallbackSubtree;