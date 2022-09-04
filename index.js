"use strict";
const fs = require("fs");
const { Stats } = fs;
const { join } = require("path");
/**@callback returnTree @param {object} tree*/
/**@callback proceed @param {object|undefined} nextBranch*/
/**@callback block*/
/**@callback callback*/
/**@callback statCallback @param {{path:string branch:object stats:Stats}} branchData @param {callback} callback*/
/**@callback subBranchCallback @param {{path:string dirpath:string file:string dirbranch:object}} @param {proceed} proceed @param {block} block*/
module.exports = class CompoundCallbackSubtree {
    #queue = [];
    #tree = null;
    #counter = 0;
    /**@param {{dirStatCb:statCallback fileStatCb:statCallback subBranchCb:subBranchCallback}} options*/
    constructor(options = {}) {
        if (typeof options?.dirStatCb === "function") this.dirStatCb = options.dirStatCb;
        if (typeof options?.fileStatCb === "function") this.fileStatCb = options.fileStatCb;
        if (typeof options?.subBranchCb === "function") this.subBranchCb = options.subBranchCb;
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
        this.#counter = 1;
        this.#subBranch({ path: this.#queue[0].path, branch: this.#tree = {} });
    }
    #subBranch(branchData) {
        fs.stat(branchData.path, (error, stats) => {
            if (error !== null)
                return this.#onError(error);
            branchData.stats = stats;
            if (stats.isDirectory())
                this.dirStatCb(branchData, () => {
                    fs.readdir(branchData.path, (error, files) => {
                        if (error !== null)
                            return this.#onError(error);
                        this.#counter += files.length;
                        for (const file of files) {
                            const nextpath = join(branchData.path, file);
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
                this.fileStatCb(branchData, () => this.#returnTree());
        });
    }
    #onError(error) {
        const callbacks = this.#queue[0].callbacks;
        for (const callback of callbacks)
            process.nextTick(callback, error, null);
        this.#next(callbacks);
    }
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
    /**Get the Tree that was returned from the previous call to fromPath.
    * @param {returnTree} callback*/
    lastTree(callback = console.log) {
        if (this.#counter > 0) return void (this.#queue[0].callbacks.push(callback));
        else if (!this.#tree) return callback(new Error("There is no last tree..."), null);
        callback(null, this.#tree);
    }
    /**@param {{path:string branch:object stats:Stats}} branchData @param {callback} callback*/
    fileStatCb(branchData, callback = callbackFailure) {
        callback();
    }
    /**@param {{path:string branch:object stats:Stats}} branchData @param {callback} callback*/
    fileStatCb(branchData, callback = callbackFailure) {
        callback();
    }
    /**@param {{path:string dirpath:string file:string dirbranch:object}} branchData @param {proceed} proceed @param {block} block*/
    subBranchCb(branchData, nextBranch = callbackFailure, blockBranch) {
        nextBranch();
    }
}
const callbackFailure = () => { throw Error("This method is not meant to be used"); };