"use strict";
const { readdir, stat, Stats } = require("fs");
const { join } = require("path");

const allKeysStats = {};
for (const key of Object.keys(new Stats()))
  allKeysStats[key] = true;

module.exports = (basePath, keysStats = []) => {
  return new Promise((resolve, reject) => {
    if (keysStats instanceof Array) {
      const baseTree = {};
      (function checkKeys() {
        const cloneKeys = Array.from(keysStats);
        keysStats = [];
        for (const key of cloneKeys)
          if (allKeysStats[key] !== undefined)
            keysStats.push(key);
      }());
      const subTree = (subPath, objSubTree) => {
        return new Promise((resolve, reject) => {
          _fs.stat(subPath, (err, stats) => {
            if (err !== null)
              reject();
            if (stats.isDirectory()) {
              _fs.readdir(subPath, async (err, files) => {
                for (const file of files) {
                  objSubTree[file] = {};
                  await subTree(subPath + "/" + file, objSubTree[file]);
                }
                resolve();
              });
            }
            else if (stats.isFile()) {
              for (const key of keysStats)
                objSubTree[key] = stats[key];
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
