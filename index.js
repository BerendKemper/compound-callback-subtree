"use strict";
const fs = require("fs");
const _path = require("path");
function InternalTree(options) {
	this.dirStatsCb = options.dirStatsCb || ((data, callback) => callback());
	this.fileStatsCb = options.fileStatsCb || ((data, callback) => callback());
	this.subBranchCb = options.subBranchCb || ((data, nextBranch, blockBranch) => nextBranch());
	this.cacheQueue = [];
};
InternalTree.prototype.fromPath = function fromPath(path, callback) {
	const branch = {};
	this.counter = 1;
	this.basepath = path;
	this.branchData = { [path]: { path, branch } };
	this.returnTree = () => callback(null, branch);
	this.callback = callback;
	this.subBranch(path);
};
InternalTree.prototype.subBranch = function subBranch(path) {
	fs.stat(path, (error, stats) => this.onStat(error, stats, path));
};
InternalTree.prototype.onStat = function onStat(error, stats, path) {
	if (error !== null)
		this.callback(error, null);
	this.branchData[path].stats = stats
	if (stats.isDirectory())
		this.dirStatsCb(this.branchData[path], () => this.onDirStatsCb(path));
	else if (stats.isFile())
		this.fileStatsCb(this.branchData[path], () => this.checkTreeFinished());
};
InternalTree.prototype.onDirStatsCb = function onDirStatsCb(dirpath) {
	fs.readdir(dirpath, (error, files) => this.onReaddir(error, files, dirpath));
};
InternalTree.prototype.onReaddir = function onReaddir(error, files, dirpath) {
	if (error !== null)
		this.callback(error, null);
	this.counter--;
	for (const file of files) {
		this.counter++;
		const path = _path.join(dirpath, file);
		this.branchData[path] = { path, dirpath, file, dirbranch: this.branchData[dirpath].branch };
		this.subBranchCb(this.branchData[path], nextbranch => this.onSubBranchCb(path, file, nextbranch), () => this.checkTreeFinished());
	};
};
InternalTree.prototype.onSubBranchCb = function onSubBranchCb(path, file, nextbranch) {
	const branch = this.branchData[path].dirbranch[file] = nextbranch || {};
	this.branchData[path].branch = branch;
	this.subBranch(path);
};
InternalTree.prototype.checkTreeFinished = function checkTreeFinished() {
	if (--this.counter === 0) {
		this.returnTree();
		this.clearCache();
	}
};
InternalTree.prototype.clearCache = function clearCache() {
	const branch = this.branchData[this.basepath].branch;
	for (const callback of this.cacheQueue)
		callback(null, branch);
	this.cacheQueue = [];
};
InternalTree.prototype.fromCache = function fromCache(callback) {
	if (this.counter === undefined)
		callback(new Error("nothing in cache..."), null);
	if (this.counter === 0)
		callback(null, this.branchData[this.basepath].branch);
	else
		this.cacheQueue.push(callback);
};
class CompoundCallbackSubTree {
	/**@param {Object} options 
	*  @param {Function} options.dirStatsCb
	*  @param {Function} options.fileStatsCb
	*  @param {Function} options.subBranchCb */
	constructor(options = {}) {
		const internalTree = new InternalTree(options);
		/**@param {String} basePath 
		 * @param {Function} callback */
		this.fromPath = function fromPath(basePath, callback = (error, tree) => console.log(tree)) {
			internalTree.fromPath(basePath, callback);
		};
		/**@param {Function} callback */
		this.fromCache = function fromCache(callback = (error, tree) => console.log(tree)) {
			internalTree.fromCache(callback);
		};
		Object.freeze(this);
	}
};
module.exports = CompoundCallbackSubTree;