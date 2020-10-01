# compound-callback-subtree
A subtree method that offers great flexibility and features to the developer.
<pre><code class="language-javascript">npm i compound-callback-subtree

const { CompoundCallbackSubTree } = require("compound-callback-subtree");</code></pre>
<h2>Class: <code>CompoundCallbackSubTree</code></h2>
<h3><code>CompoundCallbackSubTree.fromPath(pathName[,callback])</code></h3>
<ul>
	<summary>
		<code>basePath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
	</summary>
	<details>
		<summary>
			<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(err, tree) => console.log(tree)</code>
		</summary>
    	<ul>
        	<li><code>err</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">&lt;Error&gt;</a></li>
        	<li><code>tree</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
    	</ul>
	</details>
</ul>
The <code>basepath</code> option allows the developer to specify in which base directory a subtree must be generated from. The <code>err</code> is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type">Null</a> unless the internal methods <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_stat_path_options_callback">fs.stats()</a> or <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a> return an error, the callback will return the error.
<h3><code>CompoundCallbackSubTree.fromCache([callback])</code></h3>
<ul>
	<details>
		<summary>
			<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(err, tree) => console.log(tree)</code>
		</summary>
    	<ul>
        	<li><code>err</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">&lt;Error&gt;</a></li>
        	<li><code>tree</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
    	</ul>
	</details>
</ul>
The <code>err</code> is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type">Null</a> unless there is no tree in the cache, the callback will return the an error.
<h3><code>new CompoundCallbackSubTree([options])</code></h3>
<ul>
	<details>
		<summary>
			<code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
		</summary>
		<ul>
			<details>
				<summary>
					<code>dirStatsCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, callback) => callback()</code>
				</summary>
				<ul>
					<li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
					<ul>
						<li><code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
						<li><code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a></li>
						<li><code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
					</ul>
					<li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> <b>Required!</b></li>
				</ul>
			</details>
			<details>
				<summary>
					<code>fileStatsCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, callback) => callback()</code>
				</summary>
				<ul>
					<li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
					<ul>
						<li><code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
						<li><code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a></li>
						<li><code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
					</ul>
					<li><code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> <b>Required!</b></li>
				</ul>
			</details>
			<details>
				<summary>
					<code>subBranchCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, nextBranch, blockBranch) => nextBranch()</code>
				</summary>
				<ul>
					<li><code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
					<ul>
						<li><code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
						<li><code>dirpath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
						<li><code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a></li>
						<li><code>dirbranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a></li>
					</ul>
					<li><code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> <b>Required!</b></li>
					<ul>
						<li><code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">&lt;undefined&gt;</a></li>
					</ul>
					<li><code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Optional</li>
				</ul>
			</details>
		</ul>
	</details>
</ul>
The <code>dirStatsCb</code> and <code>fileStatsCb</code> options are optional functions with required <code>data</code> and <code>callback</code> parameters. The <code>data</code> object contains the properties <code>path</code>, <code>stats</code> and <code>branch</code>. The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> Object and it allows the developer to add properties to the <code>branch</code> Object. The <code>path</code> property allows the developer to add the <code>path</code> from either files or directories to the <code>branch</code> Object. The <code>subBranchCb</code> option is another optional function that has an <code>data</code> parameter. The <code>data</code> object contains the properties <code>path</code>, <code>nextPath</code>, <code>file</code> and <code>branch</code>. These properties represent the current <code>path</code>, the <code>file</code> found in the current directory (this can either be a file or directory), when the <code>path</code> is <a href="https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_join_paths">join</a>ed with the <code>file</code> the <code>nextPath</code> is the result and the so-far generated <code>branch</code>. The <code>subBranchCb</code> function must return a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a>. Important to understand is that when the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a> <code>resolves</code> the <code>subTree</code> will recursively go deeper into sub-branches. When the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a> <code>rejects</code> the <code>subTree</code> will not go any deeper. That means that with the <code>file</code> parameter the developer can determine if a file or directory should be ignored. The developer can also choose to <code>resolve</code> the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">&lt;Promise&gt;</a> with an Object. This Object represents the <code>nextBranch</code> and if this Object is given properties then they will be added to the next-branch. Check out the the example below to see it all in action.
<h2>Example</h2>
<pre><code>node_modules (root)
|__test.js
|__compund-callback-subtree
|     |__ .git.js
|     |     |__ etc...
|     |__ index.js
|     |__ package.json
|     |__ README.md
|__etc...
// ...
const CompoundCallbackSubTree = require("compound-cb-subtree");
const { localeTimezoneDate, dateNotation, utc0 } = require("locale-timezone-date");
const path = require("path");
const { filesJSON, FileJSON } = require("files-json");
// ...
const e3sBytesNotation = function load() {
    const e3sBytes = { 0: "B", 1: "KB", 2: "MG", 3: "GB", 4: "TB", 5: "PB" };
    return byteLength => {
        let e3s = 0;
        while (byteLength >= 1024 && e3sBytes[e3s++])
            byteLength /= 1024;
        return `${byteLength} ${e3sBytes[e3s]}`;
    }
}();
const ignore = { ".git": true, ".gitignore": true };
// ...
const routineSubTree = new CompoundCallbackSubTree({
    subBranchCb: data => new Promise((resolve, reject) => {
        if (data.file.endsWith(".json") && data.path.endsWith(data.file.substring(0, data.file.length - 5))) {
            console.log("triggered!")
            new FileJSON(data.nextPath).then(fileJSON =>
                fileJSON.close(reject(Object.assign(data.branch, fileJSON))));
        }
        else if (!ignore[data.file])
            resolve();
        else
            reject();
    }),
    dirStatsCb: (data, callback) => {
        data.branch["create-time"] = localeTimezoneDate.toISOString(new Date(data.stats.birthtimeMs));
        data.branch.dirpath = path.join(__dirname, data.path);
        callback();
    },
    fileStatsCb: (data, callback) => {
        data.branch["create-time"] = localeTimezoneDate.toISOString(new Date(data.stats.birthtimeMs));
        data.branch["byte-size"] = e3sBytesNotation(data.stats.size);
        data.branch.filepath = path.join(__dirname, data.path);
        callback();
    }
});
// ...
routineSubTree.subTree("./", tree => console.log("tree:", tree));
// returns
//   tree: {
//     'create-time': '2020-08-06T21:50:56.504+0200',
//     dirpath: 'D:\\js\\node_modules\\',
//     'compound-callback-subtree': {
//       'create-time': '2020-08-16T23:29:00.675+0200',
//       dirpath: 'D:\\js\\node_modules\\compound-callback-subtree',
//------>'monkey says': 'hoehoehaha',
//       'index.js': {
//         'create-time': '2020-08-16T23:29:02.819+0200',
//         'byte-size': '1.917 KB',
//         filepath: 'D:\\js\\node_modules\\compound-callback-subtree\\index.js'
//       },
//       'package.json': {
//         'create-time': '2020-08-16T23:29:02.827+0200',
//         'byte-size': '666 B',
//         filepath: 'D:\\js\\node_modules\\compound-callback-subtree\\package.json'
//       },
//       'README.md': {
//         'create-time': '2020-08-16T23:29:02.813+0200',
//         'byte-size': '10.193 KB',
//         filepath: 'D:\\js\\node_modules\\compound-callback-subtree\\README.md'
//       }
//     },
//   // etc...
//   }</code></pre>
