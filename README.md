# compound-callback-subtree
A subtree method that offers great flexibility and features to the developer.
<pre><code>npm i compound-callback-subtree</code></pre>
```javascript
const CompoundCallbackSubTree = require("compound-callback-subtree");
```
<h2>Class: <code>CompoundCallbackSubTree</code></h2>
<h3><code>CompoundCallbackSubTree.fromPath(basePath[,callback])</code></h3>
<ul>
    <details>
		<summary>
			<code>basePath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
		</summary>
		The <code>basepath</code> option allows the developer to specify in which base directory a subtree must be generated from.
	</details>
	<details>
		<summary>
			<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(err, tree) => console.log(tree)</code>
		</summary>
    	<ul>
			<details>
				<summary>
					<code>err</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">&lt;Error&gt;</a>
				</summary>
				The <code>err</code> is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type">Null</a> unless the internal methods <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_stat_path_options_callback">fs.stats()</a> or <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a> return an error, the callback will return the error.
			</details>
			<details>
				<summary>
					<code>tree</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
				</summary>
				Check out the the example below to see a tree.
			</details>
    	</ul>
	</details>
</ul>
<h3><code>CompoundCallbackSubTree.fromCache([callback])</code></h3>
<ul>
	<details>
		<summary>
			<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(err, tree) => console.log(tree)</code>
		</summary>
    	<ul>
			<details>
				<summary>
					<code>err</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">&lt;Error&gt;</a>
				</summary>
				The <code>err</code> is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type">Null</a> unless there is no tree in the cache, the callback will return the an error.
			</details>
			<details>
				<summary>
					<code>tree</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
				</summary>
				Check out the the example below to see a tree.
			</details>
    	</ul>
	</details>
</ul>
<h3><code>new CompoundCallbackSubTree([options])</code></h3>
<ul>
	<details>
		<summary>
			<code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
		</summary>
		<ul>
			<details>
				<summary>
					<code>dirStatsCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, callback) => callback()</code> Optionals
				</summary>
				<ul>
					<details>
						<summary>
							<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a><b>Required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> property shows the <code>path</code> from the sub-directory and the developer can choose to add it the <code>branch</code> Object.
							</details>
							<details>
								<summary>
									<code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a>
								</summary>
								The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> Object and the developer can choose to add individual properties to the <code>branch</code> Object.
							</details>
							<details>
								<summary>
									<code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
								</summary>
								Check out the the example below to see the branches from a tree.
							</details>
						</ul>
					</details>
					<details>
						<summary>
							<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> <b>Required!</b>
						</summary>
					</details>
				</ul>
			</details>
			<details>
				<summary>
					<code>fileStatsCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, callback) => callback()</code> Optional
				</summary>
				<ul>
					<details>
						<summary>
							<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a><b>Required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> property shows the <code>path</code> from the sub-file and the developer can choose to add it the <code>branch</code> Object. The <code>path</code> from sub-files could be usefull when allowing the front-end to fetch the file's content from the back-end.
							</details>
							<details>
								<summary>
									<code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a>
								</summary>
								The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> Object and the developer can choose to add individual properties to the <code>branch</code> Object.
							</details>
							<details>
								<summary>
									<code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
								</summary>
								Check out the the example below to see the branches from a tree.
							</details>
						</ul>
					</details>
					<details>
						<summary>
							<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> <b>Required!</b>
						</summary>
					</details>
				</ul>
			</details>
			<details>
				<summary>
					<code>subBranchCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, nextBranch, blockBranch) => nextBranch()</code>
				</summary>
				<ul>
					<details>
						<summary>
							<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a><b>Required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> is created by passing over <code>dirpath</code> and <code>file</code> through <a href="https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_join_paths">path.join()</a>. This method is compatible on Windos and Linux OS.
							</details>
							<details>
								<summary>
									<code>dirpath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> from the <code>dirbranch</code>.
							</details>
							<details>
								<summary>
									<code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The name of the file that was found from the <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a> method that was called on the <code>path</code> from the <code>dirbranch</code>.
							</details>
							<details>
								<summary>
									<code>dirbranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
								</summary>
								The <code>dirbranch</code> that may or may not recursively contain the <code>file</code> as key and the next created <code>branch</code> as value, depending on wether <code>nextBranch</code> or <code>blockBranch</code> is called.
							</details>
						</ul>
					</details>
					<details>
						<summary>
							<code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> <b>Required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">&lt;undefined&gt;</a>
								</summary>
								In case an <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> representing the <code>nextBranch</code> is passed over as an argument to the <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> this object will become the next branch. In case of <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">&lt;undefined&gt;</a> was passed over an empty Object become the next branch. The developer can choose to add additional information to the <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>. Check out the example below of how the content from a json-file (e.g. a configuration file) is added to the <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>.
							</details>
						</ul>
						The <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> is a callback that will trigger another recursive sub-tree process.
					</details>
					<details>
						<summary>
							<code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Optional
						</summary>
						The <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> is a callback that will block any further recursive sub-tree. The developer can use this and choose to ignore particular files and directories depending on the <code>name</code> of the file that is found within the <code>data</code> parameter.
					</details>
				</ul>
				After <code>dirStatsCb</code>, <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a> will be fired to find all files contained within the directory and every file will be passed through <code>subBranchCb</code>.
			</details>
		</ul>
		A thing that is composed of two or more separate elements, a mixture.
	</details>
</ul>
<h2>Example</h2>
```javascript
/*
node_modules (root)
|__test.js
|__compund-callback-subtree
|     |__ .git
|     |     |__ etc... 
|     |__ compound-callback-subtree.json
|     |__ index.js
|     |__ package.json
|     |__ README.md
|__etc...
*/*
const CompoundCallbackSubTree = require("compound-cb-subtree");
const { localeTimezoneDate, dateNotation, utc0 } = require("locale-timezone-date");
const path = require("path");
const { filesJSON, FileJSON } = require("files-json");

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

const routineSubTree = new CompoundCallbackSubTree({
	subBranchCb: (data, nextBranch, blockBranch) => {
		if (data.file.endsWith(".json") && data.dirpath.endsWith(data.file.substring(0, data.file.length - 5))) {
			console.log("triggered!");
			new FileJSON(data.path, fileJSON => {
				Object.assign(data.dirbranch, fileJSON);
				fileJSON.close(blockBranch());
			});
		}
		else if (!ignore[data.file])
			nextBranch();
		else
			blockBranch();
	},
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

routineSubTree.fromPath("./", tree => console.log("tree:", tree));
/*
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
//   }
*/
```
