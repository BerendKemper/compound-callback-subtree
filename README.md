# compound-callback-subtree
A subtree method that offers great flexibility and features to the developer.
<pre><code class="language-javascript">npm i compound-callback-subtree

const { compoundCbSubTree, statCallback } = require("compound-callback-subtree");</code></pre>
<ul>
    <li><a href="https://github.com/BerendKemper/task-clock#class-taskclock">Class: TaskClock</a></li>
    <ul>
        <li><a href="https://github.com/BerendKemper/task-clock#taskclockfinish">taskClock.finish()</a></li>
        <li><a href="https://github.com/BerendKemper/task-clock#taskclockstop">taskClock.stop()</a></li>
        <li><a href="https://github.com/BerendKemper/task-clock#new-taskclockoptionstask">new TaskClock([options][,task])</a></li>
    </ul>
    <li><a href="https://github.com/BerendKemper/task-clock#examples">Examples</a></li>
</ul>
<h3>compoundCbSubTree([options][,callback])</h3>
<ul>
    <li><code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
    <ul>
        <li><code>basePath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a> Default: "./"</li>
        <li><code>dirStatsCbs</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Default: {}</li>
        <ul>
            <li><a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">fs.Stats.anyKey</a><code>: callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></li>
            <ul>
                <li><code>any</code> (whatever returns from) <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats.key&gt;</a></li>
                <li>Returns <code>do_with_it_what_you_need</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types">&lt;any&gt;</a></li>
            </ul>
            <li><a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">fs.Stats.anyKey</a><code>: callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></li>
            <li>...etc</li>
        </ul>
        <li><code>fileStatsCbs</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Default: {}</li>
        <ul>
            <li><a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">fs.Stats.anyKey</a><code>: callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></li>
            <ul>
                <li><code>any</code> (whatever returns from) <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats.key&gt;</a></li>
                <li>Returns <code>do_with_it_what_you_need</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types">&lt;any&gt;</a></li>
            </ul>
            <li>...etc</li>
        </ul>
        <li><code>subBranchCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>branch => new Promise(resolve => resolve())</code></li>
        <ul>
            <li><code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
            <ul>
                <li><code>subpath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
                <li><code>nextPath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
                <li><code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
                <li><code>currentBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
            </ul>
            <li>Returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a></li>
            <ul>
                <li><code>resolve</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve">&lt;param1&gt;</a></li>
                <ul>
                    <li><code>subBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">&lt;undefined&gt;</a></li>
                </ul>
                <li><code>reject</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject">&lt;param2&gt;</a></li>
            </ul>
        </ul>
    </ul>
    <li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>tree => tree</code></li>
    <ul>
        <li><code>tree</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
    </ul>
</ul>
<h3>statsCallback(key,callback)</h3>

The function <b>fsStatsTree</b> has been developed to return a data-tree of sub-directories and files in those sub-directories. The function takes in two parameters, you must pass a base-path as the 1st parameter and you may (optionally) pass an Object as 2nd parameter. This function internally calls the <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_stat_path_options_callback">fs.stat()</a> and the <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a> methods, like every other recursive directory tree. The Object from the 2nd parameter must be given keys from the <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">fs.Stats</a> class and function callbacks as the values. The returned data-tree of this function adds the keys from the <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">fs.Stats</a> class to files-only (not to directories). The callbacks were added because now you may modify the data returned from the keys from the <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">fs.Stats</a> class. This allows you to parse the time returned by the "birthtimeMs"-key through the Date class and return an ISO-string, or to add the String " bytes" to the values returned from the "size"-key, or to do nothing and just return the actual value like the return from the "ctimeMs"-key. As an extra feature you may also pass the callback itself through the function <b>namedStatsCallback</b>. This function takes in the new name as 1st parameter and the callback as the 2nd parameter. It will add a static "name" property to the callback. It allows you to change the naming of the keys from the <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">fs.Stats</a> class into more readable Strings to your liking. For example it changes the key "atimeMs" into the String "last accessed" and changes the "birthtimeMs" into "created".

<pre>root
|__test.js
|__compund-callback-subtree
|     |__ .git.js
|     |     |__ etc...
|     |__ index.js
|     |__ package.json
|     |__ README.md
|__etc...
// ...
const path = require("path");
const { compoundCbSubTree, statCallback } = require("compound-cb-subtree");
const { localeTimezoneDate, dateNotation, utc0 } = require("locale-timezone-date");
// ...
const createTime = statCallback("create-time", time => localeTimezoneDate.toISOString(new Date(time)));
const e3sBytes = { 0: "B", 1: "KB", 2: "MG", 3: "GB", 4: "TB", 5: "PB" };
const fileByteSize = statCallback("byte-size", size => {
    let e3s = 0;
    while (size >= 1000 && e3sBytes[e3s++])
        size /= 1000;
    return `${size} ${e3sBytes[e3s]}`;
});
const ignore = { ".git": true, ".gitignore": true };
// ...
compoundCbSubTree({
    subBranchCb: branch => new Promise((resolve, reject) => {
        if (!ignore[branch.file])
            resolve({ path: path.join(__dirname, branch.nextPath) });
        reject();
    }),
    dirStatsCbs: { 'birthtimeMs': createTime },
    fileStatsCbs: { 'birthtimeMs': createTime, 'size': fileByteSize }
}, tree => console.log("tree:", tree));
// ...
// returns
// tree: {
//   'create-time': '2020-08-06T21:50:56.504+0200',
//   'compound-cb-subtree': {
//     path: 'D:\\js\\node_modules\\compound-cb-subtree',
//     'create-time': '2020-08-16T23:29:00.675+0200',
//     'index.js': {
//       path: 'D:\\js\\node_modules\\compound-cb-subtree\\index.js',
//       'create-time': '2020-08-16T23:29:02.819+0200',
//       'byte-size': '2.418 KB'
//     },
//     'package.json': {
//       path: 'D:\\js\\node_modules\\compound-cb-subtree\\package.json',
//       'create-time': '2020-08-16T23:29:02.827+0200',
//       'byte-size': '666 B'
//     },
//     'README.md': {
//       path: 'D:\\js\\node_modules\\compound-cb-subtree\\README.md',
//       'create-time': '2020-08-16T23:29:02.813+0200',
//       'byte-size': '3.48 KB'
//     }
//   },
//   // etc...
// }</pre>
