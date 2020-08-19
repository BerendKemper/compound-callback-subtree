"use strict";
const fs = require("fs");
const path = require("path");
/**@param {Object} options 
 * @param {String} options.basePath
 * @param {Function} options.dirStatsCb
 * @param {Function} options.fileStatsCb
 * @param {Function} options.subBranchCb
 * @param {Function} callback*/
const compoundCallbackSubTree = (options = {}, callback = tree => console.log(tree)) => {
    if (typeof options === "function") callback = options;
    const { basePath = "./", dirStatsCb = (data, callback) => callback(), fileStatsCb = (data, callback) => callback(), subBranchCb = data => new Promise(resolve => resolve()) } = options;
    const subTree = (subPath, objSubTree) => new Promise((resolve, reject) =>
        fs.stat(subPath, (err, stats) => {
            if (err !== null)
                reject();
            if (stats.isDirectory())
                dirStatsCb({ branch: objSubTree, stats }, () =>
                    fs.readdir(subPath, async (err, files) => {
                        if (err !== null)
                            reject();
                        for (const file of files) {
                            const nextPath = path.join(subPath, file);
                            await new Promise(resolve =>
                                subBranchCb({ path: subPath, nextPath, file, branch: objSubTree }).then(nextBranch => {
                                    objSubTree[file] = nextBranch || {};
                                    subTree(nextPath, objSubTree[file]).then(() => resolve());
                                }).catch(() => resolve()));
                        }
                        resolve();
                    }));
            else if (stats.isFile())
                fileStatsCb({ branch: objSubTree, stats }, () => resolve());
        }));
    const baseTree = {};
    subTree(basePath, baseTree).then(() => callback(baseTree));
};
module.exports = Object.freeze({ compoundCallbackSubTree });