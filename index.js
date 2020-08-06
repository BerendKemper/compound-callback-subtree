"use strict";
const { readdir, stat, Stats } = require("fs");
const { join } = require("path");

const allKeysStats = {};
for (const key of Object.keys(new Stats()))
    allKeysStats[key] = true;

const subTree = (subPath, statCallbacks) => {
    const baseTree = {};
    const subTree = (subPath, objSubTree) => {
        return new Promise((resolve, reject) => {
            _fs.stat(subPath, (err, stats) => {
                if (err !== null)
                    reject();
                if (stats.isDirectory()) {
                    _fs.readdir(subPath, async (err, files) => {
                        for (const file of files) {
                            const nextPath = _path.join(subPath, file);
                            if (file.endsWith(".json") && subPath.endsWith(file.substring(0, file.length - 5)))
                                Object.assign(objSubTree, await configJson(nextPath));
                            else {
                                objSubTree[file] = {};
                                await subTree(nextPath, objSubTree[file]);
                            }
                        }
                        resolve(baseTree);
                    });
                }
                else if (stats.isFile()) {
                    for (const key in statCallbacks) {
                        const statCallback = statCallbacks[key];
                        objSubTree[statCallback.key || key] = statCallback(stats[key]);
                    }
                    resolve(baseTree);
                }
            });
        });
    };
    return subTree(subPath, baseTree);
};

/**
 * Create a tree of sub-directories and show stats of files
 * @param  {String} basePath        The base path
 * @param  {Object} statsCallbacks  The keys that should be passed through a callback
 * @return {Object}                 Tree with stats-values that can be modified by the statsCallbacks
 */
const fsTreeStats = (basePath, statsCallbacks = {}) => {
    return new Promise((resolve, reject) => {
        if (typeof statsCallbacks === "object" && statsCallbacks instanceof Array === false) {
            const baseTree = {};
            (function checkKeys() {
                const keys = Object.keys(statsCallbacks);
                for (const key of keys)
                    if (allKeysStats[key] === undefined || typeof statsCallbacks[key] !== "function")
                        delete(statsCallbacks[key]);
            }());
            subTree(basePath, baseTree)
                .then(() => resolve(baseTree))
                .catch(err => reject());
        }
        else
            reject("statsParams must be an Array");
    });
};
const namedStatsCallback = (name, statsCallback) =>  statsCallback.key = name;
module.exports = Object.freeze({ fsTreeStats, namedStatsCallback });
