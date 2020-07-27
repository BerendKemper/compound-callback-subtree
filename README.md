# fsStatsTree
Node JS Filesystem show tree of subdirectories and stats of files.

basePath<br>
|__ 2020-07-25<br>
|‎‎‎‎‎|__ monkeys<br>
|           |__ monkeys.bson<br>
|           |__ monkeys.metadata.bson<br>
|__ 2020-07-26<br>
|     |__ monkeys<br>
|           |__ monkeys.bson<br>
|           |__ monkeys.metadata.bson<br>
|__ 2020-07-27<br>
      |__ monkeys<br>
            |__ monkeys.bson<br>
            |__ monkeys.metadata.bson<br>

const fsStatsTree = require("fsStatsTree");<br>
fsStatsTree("mongo-backup", ["size", "atimeMs", "ctimeMs", "birthtimeMs"]).then(tree => console.log(tree));<br>
// returns

{<br>
  "2020-07-25": {<br>
    monkeys: {<br>
      "monkeys.bson": {<br>
        atimeMs: 1595804400002.384,<br>
        birthtimeMs: 1595866106995.452,<br>
        ctimeMs: 1595866106995.452,<br>
        size: 44630879<br>
      },<br>
      "monkeys.metadata.bson": {<br>
        atimeMs: 1595804400002.384<br>
        birthtimeMs: 1595866106915.4517<br>
        ctimeMs: 1595866106915.4517<br>
        size: 163<br>
      }<br>
    }<br>
  },<br>
  "2020-07-26": {<br>
    // etc
  }<br>
}<br>
