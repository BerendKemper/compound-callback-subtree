"use strict";
const fs = require("fs");
const { Stats } = fs;
const _path = require("path");
function InternalTree(parent) {
	this.parent = parent;
	this.cacheQueue = [];
};
InternalTree.prototype = {
	fromPath(path, callback) {
		this.tree = {};
		this.counter = 1;
		this.branchData = { [path]: { path, branch: this.tree } };
		this.callback = callback;
		this.subBranch(path);
	},
	subBranch(path) {
		fs.stat(path, (error, stats) => this.onStat(error, stats, path));
	},
	onStat(error, stats, path) {
		if (error !== null)
			this.callback(error, null);
		this.branchData[path].stats = stats
		if (stats.isDirectory())
			this.parent.dirStatsCb(this.branchData[path], () => this.onDirStatsCb(path));
		else if (stats.isFile())
			this.parent.fileStatsCb(this.branchData[path], () => this.clearCacheQueueOnTreeFinished());
	},
	onDirStatsCb(dirpath) {
		fs.readdir(dirpath, (error, files) => this.onReaddir(error, files, dirpath));
	},
	onReaddir(error, files, dirpath) {
		if (error !== null)
			this.callback(error, null);
		this.counter += files.length - 1;
		for (const file of files) {
			const path = _path.join(dirpath, file);
			this.branchData[path] = { path, dirpath, file, dirbranch: this.branchData[dirpath].branch };
			this.parent.subBranchCb(this.branchData[path], nextbranch => this.onSubBranchCb(path, file, nextbranch), () => this.clearCacheQueueOnTreeFinished());
		};
	},
	onSubBranchCb(path, file, nextbranch) {
		const branch = this.branchData[path].dirbranch[file] = nextbranch || {};
		this.branchData[path].branch = branch;
		this.subBranch(path);
	},
	clearCacheQueueOnTreeFinished() {
		if (--this.counter === 0) {
			this.branchData = null;
			this.callback(null, this.tree);
			for (const callback of this.cacheQueue)
				callback(null, this.tree);
			this.cacheQueue = [];
		}
	},
	fromCache(callback) {
		if (this.counter === undefined)
			callback(new Error("nothing in cache..."), null);
		if (this.counter === 0)
			callback(null, this.tree);
		else
			this.cacheQueue.push(callback);
	}
};
class CompoundCallbackSubTree {
	#private;
	constructor(options = {}) {
		this.#private = new InternalTree(this);
		if (options.dirStatsCb)
			this.dirStatsCb = options.dirStatsCb;
		if (options.fileStatsCb)
			this.fileStatsCb = options.fileStatsCb;
		if (options.subBranchCb)
			this.subBranchCb = options.subBranchCb;
	};
	/**Get a Tree from all the (sub) files and folders from a basePath
	 * @param {String} basePath 
	 * @param {Function} callback
	 */
	fromPath(basePath, callback = console.log) {
		this.#private.fromPath(basePath, callback);
	};
	/**Get the Tree that was returned from the previous call to fromPath.
	 * @param {Function} callback 
	 */
	fromCache(callback = console.log) {
		this.#private.fromCache(callback);
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
	 * @param {Object} cbs 
	 * @param {Function} cbs.nextBranch
	 * @param {Function} cbs.blockBranch
	 */
	subBranchCb(data, cbs = { nextBranch: callbackFailure }) {
		cbs.nextBranch();
	};
}
module.exports = CompoundCallbackSubTree;