"use strict";
const fs = require("fs");
const _path = require("path");
/**@param {Object} options 
 * @param {String} options.basePath
 * @param {Function} options.dirStatsCb
 * @param {Function} options.fileStatsCb
 * @param {Function} options.subBranchCb
 * @param {Function} callback*/
const compoundCallbackSubTree = (options = {}, callback = tree => console.log(tree)) => {
    if (typeof options === "function") callback = options;
    const { basePath = "./", dirStatsCb = (data, callback) => callback(), fileStatsCb = (data, callback) => callback(), subBranchCb = data => new Promise(resolve => resolve()) } = options;
    const subTree = (subPath, branch) => new Promise((resolve, reject) =>
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
    const tree = {};
    subTree(basePath, tree).then(() => callback(tree));
};
module.exports = Object.freeze({ compoundCallbackSubTree });