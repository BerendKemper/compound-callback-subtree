# fsStatsTree
Node JS Filesystem show tree of subdirectories and stats of files.

<pre>
root
|__app.js
|__mongo-backup
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

const { fsStatsTree, namedStatsCallback } = require("fsStatsTree");
fsStatsTree("./mongo-backup", {
  "size": size => size + " bytes",
  "atimeMs": namedStatsCallback("last accessed", time => new Date(time).toISOString()),
  "ctimeMs": time => time,
  "birthtimeMs": namedStatsCallback("created", time => new Date(time).toISOString())
}).then(tree => console.log(tree));

// returns
{
  "2020-07-25": {
    monkeys: {
      "monkeys.bson": {
        size: "43900449 bytes",
        "last accessed": "2020-07-25T09:24:39.104Z",
        ctimeMs: 1595866106995.452,
        created: "2020-07-25T10:44:30.416Z"
      },
      "monkeys.metadata.bson": {
        size: "163 bytes",
        "last accessed": "2020-07-25T09:24:39.104Z",
        ctimeMs: 1595866106915.4517,
        created: "2020-07-25T10:44:30.340Z"
      }
    }
  },
  "2020-07-26": {
    // etc...
  },
  // etc...
}
</pre>
