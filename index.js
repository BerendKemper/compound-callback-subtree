"use strict";
const { readdir, stat, FSReqCallback } = process.binding('fs');
const { Stats } = require("fs");
const path = require("path");
const { toNamespacedPath, sep } = path;
const kMsPerSec = 10 ** 3;
const kNsPerMs = 10 ** 6;
const systems = ["posix", "win32"];
module.exports = class CompoundCallbackSubtree {
    #queue = [];
    #tree = null;
    #counter = 0;
    #path = path.posix;
    constructor(options = {}) {
        if (typeof options?.dirStatCb === "function") this.dirStatCb = options.dirStatCb;
        if (typeof options?.fileStatCb === "function") this.fileStatCb = options.fileStatCb;
        if (typeof options?.subBranchCb === "function") this.subBranchCb = options.subBranchCb;
    }
    fromPath(path, callback = console.log) {
        const next = this.#queue.find(next => next.path === path);
        if (next) return next.callbacks.push(callback);
        this.#queue.push({ path, callbacks: [callback] });
        if (this.#queue.length === 1) return this.#subTree();
    }
    #subTree() {
        this.#counter = 1;
        let _path = this.#queue[0].path;
        if (process.platform === "win32")
            this.#path = path[systems.find(sys => _path.includes(path[sys].sep)) ?? "posix"]; // if both systems are matching or if no system is matching defaults to posix
        this.#subBranch(toNamespacedPath(_path), { path: _path, branch: this.#tree = {}, dirpath: this.#path.dirname(_path), file: this.#path.basename(_path) });
    }
    #subBranch(nspath, branchData) {
        const req = new FSReqCallback(false);
        req.oncomplete = this.#makeStatsCallback(nspath, branchData);
        stat(nspath, false, req);
    }
    #makeStatsCallback(nspath, branchData) {
        return (error, stats) => this.#callbackAfterStat(error, stats, nspath, branchData);
    }
    #callbackAfterStat(error, stats, nspath, branchData) {
        if (error !== null)
            return this.#onError(error);
        stats = branchData.stats = new Stats(
            stats[0], stats[1], stats[2], stats[3], stats[4],
            stats[5], stats[6], stats[7], stats[8], stats[9],
            stats[10] * kMsPerSec + stats[11] / kNsPerMs,
            stats[12] * kMsPerSec + stats[13] / kNsPerMs,
            stats[14] * kMsPerSec + stats[15] / kNsPerMs,
            stats[16] * kMsPerSec + stats[17] / kNsPerMs
        );
        if (stats.isDirectory())
            this.dirStatCb(branchData, this.#makeDirStatCallback(nspath, branchData));
        else if (stats.isFile())
            this.fileStatCb(branchData, this.#makeReturnTreeCallback());
    }
    #makeDirStatCallback(nspath, branchData) {
        return () => this.#dirStatCallback(nspath, branchData)
    }
    #dirStatCallback(nspath, branchData) {
        const req = new FSReqCallback();
        req.oncomplete = this.#makeReaddirCallback(nspath, branchData);
        readdir(nspath, null, false, req);
    }
    #makeReaddirCallback(nspath, branchData) {
        return (error, files) => this.#subBranchAfterReaddir(error, files, nspath, branchData);
    }
    #subBranchAfterReaddir(error, files, nspath, branchData) {
        if (error !== null)
            return this.#onError(error);
        this.#counter += files.length;
        for (const file of files) {
            const nextBranchData = { path: this.#path.join(branchData.path, file), dirpath: branchData.path, file, dirbranch: branchData.branch };
            this.subBranchCb(nextBranchData, this.#makeSubBranchCallback(nspath, file, nextBranchData), this.#makeReturnTreeCallback());
        };
        this.#returnTree();
    }
    #makeSubBranchCallback(nspath, file, branchData) {
        return nextbranch => this.#proceed(nspath + sep + file, branchData, file, nextbranch);
    }
    #proceed(nspath, branchData, file, nextbranch) {
        branchData.branch = branchData.dirbranch[file] = nextbranch ?? {};
        this.#subBranch(nspath, branchData);
    }
    #onError(error) {
        const callbacks = this.#queue[0].callbacks;
        for (const callback of callbacks)
            process.nextTick(callback, error, null);
        this.#next(callbacks);
    }
    #makeReturnTreeCallback() {
        return () => this.#returnTree();
    }
    #returnTree() {
        if (--this.#counter === 0) {
            const callbacks = this.#queue[0].callbacks;
            for (const callback of callbacks)
                process.nextTick(callback, null, this.#tree);
            this.#next(callbacks);
        }
    }
    #next(callbacks) {
        callbacks.length = 0;
        this.#queue[0] = null;
        this.#queue.shift();
        this.#tree = null;
        if (this.#queue.length > 0) this.#subTree();
    }
    dirStatCb(branchData, callback = () => { throw Error("This method is not meant to be used"); }) {
        callback();
    }
    fileStatCb(branchData, callback = () => { throw Error("This method is not meant to be used"); }) {
        callback();
    }
    subBranchCb(branchData, nextBranch = () => { throw Error("This method is not meant to be used"); }, blockBranch) {
        nextBranch();
    }
};