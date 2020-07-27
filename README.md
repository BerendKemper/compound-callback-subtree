# fsStatsTree
Node JS Filesystem show tree of subdirectories and stats of files.

<pre>
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

// returns
{
  "2020-07-25": {
    monkeys: {<br>
      "monkeys.bson": {
        atimeMs: 1595804400002.384,
        birthtimeMs: 1595866106995.452,
        ctimeMs: 1595866106995.452,
        size: 44630879
      },
      "monkeys.metadata.bson": {
        atimeMs: 1595804400002.384
        birthtimeMs: 1595866106915.4517
        ctimeMs: 1595866106915.4517
        size: 163
      }
    }
  },
  "2020-07-26": {
    // etc
  }
}
</pre>
