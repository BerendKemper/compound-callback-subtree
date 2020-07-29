"use strict";
const { readdir, stat, Stats } = require("fs");
const { join } = require("path");

const allKeysStats = {};
for (const key of Object.keys(new Stats()))
  allKeysStats[key] = true;

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
      const subTree = (subPath, objSubTree) => {
        return new Promise((resolve, reject) => {
          stat(subPath, (err, stats) => {
            if (err !== null)
              reject();
            if (stats.isDirectory()) {
              readdir(subPath, async (err, files) => {
                for (const file of files) {
                  objSubTree[file] = {};
                  await subTree(join(subPath, file), objSubTree[file]);
                }
                resolve();
              });
            }
            else if (stats.isFile()) {
              for (const key in statsCallbacks)
                objSubTree[statsCallbacks[key].name || key] = statsCallbacks[key](stats[key]);
              resolve();
            }
          });
        });
      };
      subTree(basePath, baseTree)
        .then(() => resolve(baseTree))
        .catch(err => reject());
    }
    else
      reject("statsParams must be an Array");
  });
};
const namedStatsCallback = (name, statsCallback) => {
  return Object.defineProperty(statsCallback, 'name', { value: name });
};
module.exports.fsTreeStats = fsTreeStats;
module.exports.namedStatsCallback = namedStatsCallback;
