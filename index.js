"use strict";
const fs = require("fs");
const { Stats } = fs;
const _path = require("path");
class CompoundCallbackSubTreeNoProto {
	#callstack;
	#counter;
	#tree;
	#onError(error) {
		for (const callback of this.#callstack)
			callback(error, null);
		this.#callstack = [];
	};
	constructor(options = {}) {
		this.#callstack = [];
		if (typeof options.dirStatsCb === "function")
			this.dirStatsCb = options.dirStatsCb;
		if (typeof options.fileStatsCb === "function")
			this.fileStatsCb = options.fileStatsCb;
		if (typeof options.subBranchCb === "function")
			this.subBranchCb = options.subBranchCb;
	};
	/**Get a Tree from all the (sub) files and folders from a basePath
	 * @param {String} basePath 
	 * @param {Function} callback
	 */
	fromPath(path, callback = console.log) {
		this.#counter = 1;
		const tree = this.#tree = {};
		this.#callstack.push(callback);
		const branchData = { path, branch: tree };
		const clearCallstackOnTreeFinished = () => {
			if (--this.#counter === 0) {
				for (const callback of this.#callstack)
					callback(null, tree);
				this.#callstack = [];
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
									const branch = nextBranchData.dirbranch[file] = nextbranch || {};
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
	 * @param {Function} callback 
	 */
	fromCache(callback = console.log) {
		if (this.#counter === undefined)
			callback(new Error("nothing in cache..."), null);
		if (this.#counter === 0)
			callback(null, this.#tree);
		else
			this.#callstack.push(callback);
	};
	/**
	 * @param {Object} data
	 * @param {String} data.path
	 * @param {Object} data.branch
	 * @param {Stats} data.stats
	 * @param {Function} callback 
	 */
	dirStatsCb(data, callback = callbackFailure) {
		callback();
	};
	/**
	 * @param {Object} data
	 * @param {String} data.path
	 * @param {Object} data.branch
	 * @param {Stats} data.stats
	 * @param {Function} callback 
	 */
	fileStatsCb(data, callback = callbackFailure) {
		callback();
	};
	/**
	 * @param {Object} data 
	 * @param {String} data.path
	 * @param {String} data.dirpath
	 * @param {String} data.file
	 * @param {Object} data.dirbranch
	 * @param {Function} nextBranch
	 * @param {Function} blockBranch
	 */
	subBranchCb(data, nextBranch = callbackFailure, blockBranch) {
		nextBranch();
	};
};
module.exports = CompoundCallbackSubTreeNoProto;