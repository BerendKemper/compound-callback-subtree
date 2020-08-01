# fsStatsTree
Node JS Filesystem show tree of subdirectories and stats of files.

The function fsStatsTree has been developed to return a data-tree of sub-directories and files in those sub-directories. The function takes in two parameters, you must pass a base-path as the 1st parameter and you may (optional) pass an Object as 2nd parameter. This function internally calls the fs.stat() and the fs.readdir() methods, like every other recursive directory tree. The Object from the 2nd parameter must be given keys from the fs.Stats class and function callbacks as the values. The returned data-tree of this function adds the keys from the fs.Stats class to files-only (not to directories). The callbacks were added because now you may modify the data returned from the keys from the fs.Stats class. This allows you to parse the time returned by the "birthtimeMs"-key through the Date class and return an ISO-string, or to add the String " bytes" to the values returned from the "size"-key, or to do nothing and just return the actual value like the return from the "ctimeMs"-key. As an extra feature you may also pass the callback itself through the namedStatsCallback function. This function takes in the new name as 1st parameter and the callback as the 2nd parameter. It will add a static "name" property to the callback. It allows you to change the naming of the keys from the fs.Stats class into more readable Strings to your liking. For example it changes the key "atimeMs" into the String "last accessed" and changes the "birthtimeMs" into "created".

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
