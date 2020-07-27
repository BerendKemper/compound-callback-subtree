# fsStatsTree
Node JS Filesystem show tree of subdirectories and stats of files.

basePath
|__ 2020-07-25
|     |__ monkeys
|           |__ monkeys.bson
|           |__ monkeys.metadata.bson
|__ 2020-07-26
|     |__ monkeys
|           |__ monkeys.bson
|           |__ monkeys.metadata.bson
|__ 2020-07-27
      |__ monkeys
            |__ monkeys.bson
            |__ monkeys.metadata.bson

const fsStatsTree = require("fsStatsTree");
fsStatsTree("mongo-backup", ["size", "atimeMs", "ctimeMs", "birthtimeMs"]).then(tree => console.log(tree));
