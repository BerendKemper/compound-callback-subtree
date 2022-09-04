"use strict";
const fs = require("fs");
const { Stats } = fs;
const path = require("path");
/**@callback returnTree @param {object} tree*/
/**@callback nextBranch @param {object|undefined} nextBranch*/
/**@callback statsCallback @param {{path:string branch:object stats:fs.Stats}} branchData @param {function} callback*/
/**@callback subBranchCallback @param {{path:string dirpath:string file:string dirbranch:object}} @param {nextBranch} nextBranch @param {function} blockBranch*/
module.exports = class CompoundCallbackSubtree {
    #queue = [];
    #tree = null;
    #counter = 0;
    #returnTree() {
        if (--this.#counter === 0) {
            const callbacks = this.#queue[0].callbacks;
            for (const callback of callbacks)
                process.nextTick(callback, null, this.#tree);
            callbacks.length = 0;
            this.#next(callbacks);
        }
    }
    #next(callbacks) {
        callbacks.length = 0;
        this.#queue[0] = null;
        this.#queue.shift();
        if (this.#queue.length > 0) this.#subTree();
    }
    #onError(error) {
        const callbacks = this.#queue[0].callbacks;
        for (const callback of callbacks)
            process.nextTick(callback, error, null);
        next(callbacks);
    }
    /**@param {{dirStatsCb:statsCallback fileStatsCb:statsCallback subBranchCb:subBranchCallback}} options*/
    constructor(options = {}) {
        if (typeof options?.dirStatsCb === "function")
            this.dirStatsCb = options.dirStatsCb;
        if (typeof options?.fileStatsCb === "function")
            this.fileStatsCb = options.fileStatsCb;
        if (typeof options?.subBranchCb === "function")
            this.subBranchCb = options.subBranchCb;
    }
    /**Get a Tree from all the (sub) files and folders from a basePath
     * @param {String} basePath @param {returnTree} callback*/
    fromPath(path, callback = console.log) {
        const next = this.#queue.find(next => next.path === path);
        if (next) return next.callbacks.push(callback);
        this.#queue.push({ path, callbacks: [callback] });
        if (this.#queue.length === 1) return this.#subTree();
    }
    #subTree() {
        this.#tree = {};
        this.#counter = 1;
        this.#subBranch({ path: this.#queue[0].path, branch: this.#tree });
    }
    #subBranch(branchData) {
        fs.stat(branchData.path, (error, stats) => {
            if (error !== null)
                return this.#onError(error);
            branchData.stats = stats;
            if (stats.isDirectory())
                this.dirStatsCb(branchData, () => {
                    fs.readdir(branchData.path, (error, files) => {
                        if (error !== null)
                            return this.#onError(error);
                        this.#counter += files.length;
                        for (const file of files) {
                            const nextpath = path.join(branchData.path, file);
                            const nextBranchData = { path: nextpath, dirpath: branchData.path, file, dirbranch: branchData.branch };
                            this.subBranchCb(nextBranchData, nextbranch => {
                                nextBranchData.branch = nextBranchData.dirbranch[file] = nextbranch ?? {};
                                this.#subBranch(nextBranchData);
                            }, () => this.#returnTree());
                        };
                        this.#returnTree();
                    });
                });
            else if (stats.isFile())
                this.fileStatsCb(branchData, () => this.#returnTree());
        });
    }
    /**Get the Tree that was returned from the previous call to fromPath.
     * @param {returnTree} callback*/
    lastTree(callback = console.log) {
        if (this.#counter > 0)
            return void (this.#queue[0].callbacks.push(callback));
        else if (!this.#tree)
            return callback(new Error("There is no last tree..."), null);
        callback(null, this.#tree);
    }
    /**@param {{path:string branch:object stats:fs.Stats}} branchData @param {function} callback*/
    dirStatsCb(branchData, callback = () => console.log("This method is not meant to be used")) {
        callback();
    }
    /**@param {{path:string branch:object stats:fs.Stats}} branchData @param {function} callback*/
    fileStatsCb(branchData, callback = () => console.log("This method is not meant to be used")) {
        callback();
    }
    /**@param {{path:string dirpath:string file:string dirbranch:object}}branchData @param {nextBranch} nextBranch @param {function} blockBranch*/
    subBranchCb(branchData, nextBranch = () => console.log("This method is not meant to be used"), blockBranch) {
        nextBranch();
    }
};