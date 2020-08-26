"use strict";
const fs = require("fs");
const _path = require("path");
const { timeStamp } = require("console");
const _subTree = new WeakMap();
class CompoundCallbackSubTree {
    /**@param {Object} options 
    *  @param {Function} options.dirStatsCb
    *  @param {Function} options.fileStatsCb
    *  @param {Function} options.subBranchCb */
    constructor(options = {}) {
        const { dirStatsCb = (data, callback) => callback(), fileStatsCb = (data, callback) => callback(), subBranchCb = data => new Promise(resolve => resolve()) } = options;
        _subTree.set(this, function subTree(subPath, branch) {
            return new Promise((resolve, reject) =>
                fs.stat(subPath, (err, stats) => {
                    if (err !== null)
                        reject("fs.stats() cought an error");
                    if (stats.isDirectory())
                        dirStatsCb({ path: subPath, stats, branch }, () =>
                            fs.readdir(subPath, async (err, files) => {
                                if (err !== null)
                                    reject("fs.readdir() cought an error");
                                for (const file of files) {
                                    const nextPath = _path.join(subPath, file);
                                    await new Promise(resolve => subBranchCb({ path: subPath, nextPath, file, branch })
                                        .then(nextBranch => subTree(nextPath, branch[file] = nextBranch || {}).then(() => resolve()))
                                        .catch(() => resolve()));
                                }
                                resolve();
                            }));
                    else if (stats.isFile())
                        fileStatsCb({ path: subPath, stats, branch }, () => resolve());
                }));
        });
    }
    /**@param {String} basePath
     * @param {Function} callback Default: tree => console.log(tree) */
    subTree(basePath, callback = tree => console.log(tree)) {
        const tree = {};
        _subTree.get(this)(basePath, tree).then(() => callback(tree));
    }
};
module.exports = CompoundCallbackSubTree;