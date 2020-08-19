"use strict";
const fs = require("fs");
const path = require("path");
/**@param {Object} options 
 * @param {String} options.basePath
 * @param {Object} options.dirStatsCbs
 * @param {Function} options.dirStatsCbs.fsStatsKey
 * @param {Object} options.fileStatsCbs
 * @param {Function} options.fileStatsCbs.fsStatsKey
 * @param {Function} options.subBranchCb
 * @param {Function} callback */
const compoundCbSubTree = (options = {}, callback = tree => tree) => {
    if (typeof options === "function") callback = options;
    const { basePath = "./", dirStatsCbs = {}, fileStatsCbs = {}, subBranchCb = branch => new Promise((resolve, reject) => resolve()) } = options;
    const subTree = (subpath, objSubTree) => new Promise((resolve, reject) =>
        fs.stat(subpath, (err, stats) => {
            if (err !== null)
                reject();
            if (stats.isDirectory()) {
                for (const key in dirStatsCbs)
                    objSubTree[dirStatsCbs[key].key || key] = dirStatsCbs[key](stats[key]);
                fs.readdir(subpath, async (err, files) => {
                    if (err !== null)
                        reject();
                    for (const file of files) {
                        const nextPath = path.join(subpath, file);
                        await new Promise(resolve =>
                            subBranchCb({ subpath, nextPath, file, currentBranch: objSubTree }).then(subBranch => {
                                objSubTree[file] = subBranch || {};
                                subTree(nextPath, objSubTree[file]).then(() => resolve());
                            }).catch(() => resolve()));
                    }
                    resolve();
                });
            }
            else if (stats.isFile()) {
                for (const key in fileStatsCbs)
                    objSubTree[fileStatsCbs[key].key || key] = fileStatsCbs[key](stats[key]);
                resolve();
            }
        }));
    const baseTree = {};
    subTree(basePath, baseTree).then(() => callback(baseTree));
};
/**
 * @param {String} key 
 * @param {Function} callback */
const statCallback = (key, statsCallback) => {
    statsCallback.key = key;
    return statsCallback
};
// const namedStatsCallback = (name, statsCallback) => statsCallback.key = name;
module.exports = Object.freeze({ compoundCbSubTree, statCallback });