# compound-callback-subtree
A subtree method that offers great flexibility and features to the developer.
<pre><code class="language-javascript">npm i compound-callback-subtree

const { compoundCallbackSubTree } = require("compound-callback-subtree");</code></pre>
<h2>compoundCallbackSubTree([options][,callback])</h2>
<ul>
    <li><code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
    <ul>
        <li><code>basePath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a> Default: <code>"./"</code></li>
        <li><code>dirStatsCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, callback) => callback()</code></li>
        <ul>
            <li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
            <ul>
                <li><code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
                <li><code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a></li>
            </ul>
            <li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Required!</li>
        </ul>
        <li><code>fileStatsCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, callback) => callback()</code></li>
        <ul>
            <li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
            <ul>
                <li><code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
                <li><code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a></li>
            </ul>
            <li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Required!</li>
        </ul>
        <li><code>subBranchCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>data => new Promise(resolve => resolve())</code></li>
        <ul>
            <li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
            <ul>
                <li><code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
                <li><code>nextPath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
                <li><code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
                <li><code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
            </ul>
            <li>Returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a></li>
            <ul>
                <li><code>resolve</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve">&lt;Promise.resolve&gt;</a></li>
                <ul>
                    <li><code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">&lt;undefined&gt;</a></li>
                </ul>
                <li><code>reject</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject">&lt;Promise.reject&gt;</a></li>
            </ul>
        </ul>
    </ul>
    <li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>tree => console.log(tree)</code></li>
    <ul>
        <li><code>tree</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
    </ul>
</ul>
The <code>basepath</code> option allows the developer to specify in which base directory a subtree must be generated from. The <code>dirStatsCb</code> and <code>fileStatsCb</code> options are optional functions with required <code>data</code> and <code>callback</code> parameters. The <code>data</code> object contains the properties <code>branch</code> and <code>stats</code>. The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> Object and it allows the developer to add properties to the <code>branch</code> Object. The <code>subBranchCb</code> option is another optional function that has an <code>data</code> parameter. The <code>data</code> object contains the properties <code>path</code>, <code>nextPath</code>, <code>file</code> and <code>branch</code>. These properties represent the current <code>path</code>, the <code>file</code> found in the current directory (this can either be a file or directory), the <code>path</code> joined with <code>file</code> that become the <code>nextPath</code> and the so-far generated <code>branch</code>. The <code>subBranchCb</code> function must return a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a>. Important to understand is that when the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a> <code>resolves</code> the sub-branch will be further inspected by calling the <code>subtree</code> function with the parameters <code>nextPath</code> and either a new sub-branch or the self-resolved <code>nextBranch</code>. When the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a> <code>rejects</code> the there will be no further call to the <code>subtree</code> function. That means the developer can determine if a <code>file</code> should be ignored. The developer can also choose to <code>resolve</code> the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a> with an Object that represents the <code>nextBranch</code> and this Object can be given properties such as filePath taken from the <code>nextPath</code> property. Check out the the example below to see it all in action.
<h2>Example</h2>
<pre><code>root
|__test.js
|__compund-callback-subtree
|     |__ .git.js
|     |     |__ etc...
|     |__ index.js
|     |__ package.json
|     |__ README.md
|__etc...
// ...
const { compoundCallbackSubTree } = require("compound-cb-subtree");
const { localeTimezoneDate, dateNotation, utc0 } = require("locale-timezone-date");
const path = require("path");
// ...
const e3sBytesNotation = function load() {
    const e3sBytes = { 0: "B", 1: "KB", 2: "MG", 3: "GB", 4: "TB", 5: "PB" };
    return byteLength => {
        let e3s = 0;
        while (byteLength >= 1000 && e3sBytes[e3s++])
            byteLength /= 1000;
        return `${byteLength} ${e3sBytes[e3s]}`;
    }
}();
const ignore = { ".git": true, ".gitignore": true };
// ...
compoundCallbackSubTree({
    subBranchCb: data => new Promise((resolve, reject) => {
        if (!ignore[data.file])
            resolve({ path: path.join(__dirname, data.nextPath) });
        reject();
    }),
    dirStatsCb: (data, callback) => {
        // console.log(data);
        data.branch["create-time"] = localeTimezoneDate.toISOString(new Date(data.stats.birthtimeMs));
        callback();
    },
    fileStatsCb: (data, callback) => {
        data.branch["create-time"] = localeTimezoneDate.toISOString(new Date(data.stats.birthtimeMs));
        data.branch["byte-size"] = e3sBytesNotation(data.stats.size);
        callback();
    }
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
// }</code></pre>
