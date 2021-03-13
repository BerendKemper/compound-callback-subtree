# compound-callback-subtree
A subtree method that offers great flexibility and features to the developer.
<pre><code>npm i compound-callback-subtree</code></pre>

```javascript
const CompoundCallbackSubTree = require("compound-callback-subtree");
```
<h2>Class: <code>CompoundCallbackSubTree</code></h2>
<h3><code>new CompoundCallbackSubTree([options])</code></h3>
<ul>
	<details>
		<summary>
			<code>options</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
		</summary>
		<ul>
			<details>
				<summary>
					<code>dirStatsCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, callback) => callback()</code> Optional
				</summary>
				<ul>
					<details>
						<summary>
							<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Parameter <b>required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> property shows the <code>path</code> from the directory. Developer can choose to add the <code>path</code> in the directory's <code>branch</code> object.
							</details>
							<details>
								<summary>
									<code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a>
								</summary>
								The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> object and the developer can choose to add certain properties to the directory's <code>branch</code> object.
							</details>
							<details>
								<summary>
									<code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
								</summary>
								The <code>branch</code> is the object represente the directory which is added into the tree. Check out the the example below to see how the <code>branch</code> from the directory gets data added to it and see that the added data is applied in the returned <code>tree</code>.
							</details>
						</ul>
					</details>
					<details>
						<summary>
							<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Parameter <b>required!</b>
						</summary>
						The <code>callback</code> is the feature that makes <code>fileStatsCb</code> asynchronous compatible. Invoking this <code>callback</code> is required.
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
							<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Parameter <b>required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> property shows the <code>path</code> from the file. Developer can choose to add the <code>path</code> in the file's <code>branch</code> object. The <code>path</code> from file could be usefull when allowing the front-end to fetch the file's content, by <code>path</code>, from the back-end.
							</details>
							<details>
								<summary>
									<code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a>
								</summary>
								The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> object and the developer can choose to add certain properties to the file's <code>branch</code> object.
							</details>
							<details>
								<summary>
									<code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
								</summary>
								The <code>branch</code> is the object represente the file which is added into the tree. Check out the the example below to see how the <code>branch</code> from the file gets data added to it and see that the added data is applied in the returned <code>tree</code>.
							</details>
						</ul>
					</details>
					<details>
						<summary>
							<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Parameter <b>required!</b>
						</summary>
						The <code>callback</code> is the feature that makes <code>fileStatsCb</code> asynchronous compatible. Invoking this <code>callback</code> is required.
				</ul>
			</details>
			<details>
				<summary>
					<code>subBranchCb</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(data, nextBranch, blockBranch) => nextBranch()</code>
				</summary>
				<ul>
					<details>
						<summary>
							<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Parameter <b>required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> is created by passing over the directory's <code>path</code> and <code>file</code> through <a href="https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_join_paths">path.join()</a>. This method is compatible on Windos and Linux OS.
							</details>
							<details>
								<summary>
									<code>dirpath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The <code>path</code> from the directory's <code>branch</code> also at <code>data.dirbranch.path</code>.
							</details>
							<details>
								<summary>
									<code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
								</summary>
								The name (plus extension if not a directory) of the file that was found in the directory through the method <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a>. This data can be usefull such as for blocking certain <code>file</code> names from being added to the <code>tree</code>.
							</details>
							<details>
								<summary>
									<code>dirbranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
								</summary>
								The <code>branch</code> from the directory in which the <code>file</code> has been found. Developer can choose to add additional information to the <code>dirbranch</code> such as pushing the <code>path</code> or <code>file</code> into a list of ignored files or such as to call another asynchronous readFile function at the <code>path</code>, block the branch with <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> and add the content of the <code>file</code> in a particular property on the <code>dirbranch</code>. Check out the example below of how the content from a json-file is added to the <code>dirbranch</code>.
							</details>
						</ul>
					</details>
					<details>
						<summary>
							<code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Parameter <b>required!</b>
						</summary>
						<ul>
							<details>
								<summary>
									<code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">&lt;undefined&gt;</a>
								</summary>
								If a <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> is passed over as the parameter to the <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> this object becomes the <code>branch</code> for that <code>file</code>. However, if <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">undefined</a> was passed over a fresh empty object literal becomes the <code>branch</code> for that <code>file</code>. Developer's can choose to pass over a self designed object as the parameter to the <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a>.
							</details>
						</ul>
						The <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is the feature that makes <code>subBranchCb</code> asynchronous compatible. Invoking either <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> or <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is required. The <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> activates the proceeding of another recursive sub-tree process for the found <code>file</code> and it's next step would be either <code>dirStatsCb</code> or <code>fileStatsCb</code>.
					</details>
					<details>
						<summary>
							<code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Parameter not required
						</summary>
						The <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is the feature that makes <code>subBranchCb</code> asynchronous compatible. Invoking either <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> or <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is required. The <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> blocks the particular <code>file</code> from being added to the <code>branch</code>. Developer can invoke the <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> to ignore certain <code>file</code> names.
					</details>
				</ul>
				After <code>dirStatsCb</code> has succeeded, under the hood <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a> will be invoked to find all files contained within the directory and every file will be passed through <code>subBranchCb</code>.
			</details>
		</ul>
		A substance formed from two or more elements chemically united in fixed proportions.
	</details>
</ul>
<h3><code>compoundCallbackSubTree.fromPath(basePath[,callback])</code></h3>
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
					<code>err</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type">&lt;Null&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">&lt;Error&gt;</a>
				</summary>
				Is an error in case the methods <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_stat_path_options_callback">fs.stats()</a> or <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a> had failed.
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
<h3><code>compoundCallbackSubTree.fromCache([callback])</code></h3>
<ul>
	<details>
		<summary>
			<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Default: <code>(err, tree) => console.log(tree)</code>
		</summary>
    	<ul>
			<details>
				<summary>
					<code>err</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type">&lt;Null&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error">&lt;Error&gt;</a>
				</summary>
				Is an error in case no tree is in the cache.
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
<!-- <h3><code>compoundCallbackSubTree.dirStatsCb(data, callback)</code></h3>
<ul>
	<details>
		<summary>
			<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Parameter <b>required!</b>
		</summary>
		<ul>
			<details>
				<summary>
					<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
				</summary>
				The <code>path</code> property shows the <code>path</code> from the directory. Developer can choose to add the <code>path</code> in the directory's <code>branch</code> object.
			</details>
			<details>
				<summary>
					<code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a>
				</summary>
				The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> object and the developer can choose to add certain properties to the directory's <code>branch</code> object.
			</details>
			<details>
				<summary>
					<code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
				</summary>
				The <code>branch</code> is the object represente the directory which is added into the tree. Check out the the example below to see how the <code>branch</code> from the directory gets data added to it and see that the added data is applied in the returned <code>tree</code>.
			</details>
		</ul>
	</details>
	<details>
		<summary>
			<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Parameter <b>required!</b>
		</summary>
		The <code>callback</code> is the feature that makes <code>dirStatsCb</code> asynchronous compatible. Invoking this <code>callback</code> is required.
	</details>
</ul>
<h3><code>compoundCallbackSubTree.fileStatsCb(data, callback)</code></h3>
<ul>
	<details>
		<summary>
			<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Parameter <b>required!</b>
		</summary>
		<ul>
			<details>
				<summary>
					<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
				</summary>
				The <code>path</code> property shows the <code>path</code> from the file. Developer can choose to add the <code>path</code> in the file's <code>branch</code> object. The <code>path</code> from file could be usefull when allowing the front-end to fetch the file's content, by <code>path</code>, from the back-end.
			</details>
			<details>
				<summary>
					<code>stats</code> <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a>
				</summary>
				The <code>stats</code> property is an <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_class_fs_stats">&lt;fs.Stats&gt;</a> object and the developer can choose to add certain properties to the file's <code>branch</code> object.
			</details>
			<details>
				<summary>
					<code>branch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
				</summary>
				The <code>branch</code> is the object represente the directory which is added into the tree. Check out the the example below to see how the <code>branch</code> from the directory gets data added to it and see that the added data is applied in the returned <code>tree</code>.
			</details>
		</ul>
	</details>
	<details>
		<summary>
			<code>callback</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> Parameter <b>required!</b>
		</summary>
		The <code>callback</code> is the feature that makes <code>dirStatsCb</code> asynchronous compatible. Invoking this <code>callback</code> is required.
	</details>
</ul>
<h3><code>compoundCallbackSubTree.subBranchCb(data, nextBranch, blockBranch)</code></h3>
<ul>
	<details>
		<summary>
			<code>data</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> Parameter <b>required!</b>
		</summary>
		<ul>
			<details>
				<summary>
					<code>path</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
				</summary>
				The <code>path</code> is created by passing over the directory's <code>path</code> and <code>file</code> through <a href="https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_join_paths">path.join()</a>. This method is compatible on Windos and Linux OS.
			</details>
			<details>
				<summary>
					<code>dirpath</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
				</summary>
				The <code>path</code> from the directory's <code>branch</code> also at <code>data.dirbranch.path</code>.
			</details>
			<details>
				<summary>
					<code>file</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
				</summary>
				The name (plus extension if not a directory) of the <code>file</code> that was found in the directory through the method <a href="https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readdir_path_options_callback">fs.readdir()</a>. This data can be usefull such as for blocking certain <code>file</code> names from being added to the <code>tree</code>.
			</details>
			<details>
				<summary>
					<code>dirbranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>
				</summary>
				The <code>branch</code> from the directory in which the <code>file</code> has been found. Developer can choose to add additional information to the <code>dirbranch</code> such as pushing the <code>path</code> or <code>file</code> into a list of ignored files or such as to call another asynchronous readFile function at the <code>path</code>, block the branch with <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> and add the content of the <code>file</code> in a particular property on the <code>dirbranch</code>. Check out the example below of how the content from a json-file is added to the <code>dirbranch</code>.
			</details>
		</ul>
	</details>
	<details>
		<summary>
			<code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Parameter <b>required!</b>
		</summary>
		<ul>
			<details>
				<summary>
					<code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">&lt;undefined&gt;</a>
				</summary>
				If a <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a> is passed over as the parameter to the <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> this object becomes the <code>branch</code> for that <code>file</code>. However, if <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type">undefined</a> was passed over a fresh empty object literal becomes the <code>branch</code> for that <code>file</code>. Developer's can choose to pass over a self designed object as the parameter to the <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a>.
			</details>
		</ul>
		The <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is the feature that makes <code>subBranchCb</code> asynchronous compatible. Invoking either <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> or <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is required. The <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> activates the proceeding of another recursive sub-tree process for the found <code>file</code> and it's next step would be either <code>dirStatsCb</code> or <code>fileStatsCb</code>.
	</details>
	<details>
		<summary>
			<code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a></code> Parameter not required
		</summary>
		The <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is the feature that makes <code>subBranchCb</code> asynchronous compatible. Invoking either <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> or <code>nextBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> is required. The <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> blocks the particular <code>file</code> from being added to the <code>branch</code>. Developer can invoke the <code>blockBranch</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function">&lt;Function&gt;</a> to ignore certain <code>file</code> names.
	</details>
</ul> -->
<h2>Example</h2>

```javascript
/*
node_modules (root)
|__test.js
|__compund-callback-subtree
|     |__ .git
|     |     |__ etc... 
|     |__ MONKEY.json
|     |__ index.js
|     |__ package.json
|     |__ README.md
|     |__ v2.0.0
|     |     |__ etc... 
|     |__ etc... 
|__etc...
*/
const CompoundCallbackSubTree = require("compound-callback-subtree");
const LocaleTimezoneDate = require("locale-timezone-date");
const { filesJSON, FileJSON } = require("files-json");
const path = require("path");
const toE3sBytesNotation = function load() {
	const e3sBytes = { 0: "B", 1: "KB", 2: "MG", 3: "GB", 4: "TB", 5: "PB" };
	return byteLength => {
		let e3s = 0;
		while (byteLength >= 1024 && e3sBytes[e3s++])
			byteLength /= 1024;
		return `${Math.round(byteLength * 100) / 100} ${e3sBytes[e3s]}`;
	};
}();
class MyVeryOwnTree extends CompoundCallbackSubTree {
	dirStatsCb(data, callback) {
		data.branch["create-time"] = new LocaleTimezoneDate(data.stats.birthtimeMs).toLocaleISOString();
		data.branch.dirpath = path.join(__dirname, data.path);
		data.branch.ignored = [];
		callback();
	};
	fileStatsCb(data, callback) {
		data.branch["create-time"] = new LocaleTimezoneDate(data.stats.birthtimeMs).toLocaleISOString();
		data.branch["byte-size"] = toE3sBytesNotation(data.stats.size);
		data.branch.filepath = path.join(__dirname, data.path);
		callback();
	};
	subBranchCb(data, nextBranch, blockBranch) {
		if (data.file === "MONKEY.json") {
			new FileJSON(data.path, fileJSON => { // this is asynchronous
				for (const prop in fileJSON)
					data.dirbranch[prop] = fileData[prop];
				fileJSON.close();
				blockBranch(); // this is asynchronous compatible
			});
		}
		else if (data.file.startsWith(".")) { // ".git", ".gitignore", ".v2.0.0", etc.
			data.dirbranch.ignored.push(data.file);
			blockBranch();
		}
		else {
			nextBranch();
		}
	};
};
const myTree = new MyVeryOwnTree();
myTree.fromPath("compound-callback-subtree", (error, tree) => {
	console.log(error, tree);
});
/*
returns
null {
	'create-time': '2020-08-16T23:29:00.675+0200',
	dirpath: 'D:\\js\\node_modules\\compound-callback-subtree',
	ignored: [ '.git', '.gitignore', '.v2.0.0', '.v3', '.v4' ],
	'index.js': {
		'create-time': '2021-02-24T19:49:19.252+0100',
		'byte-size': '4.46 KB',
		filepath: 'D:\\js\\node_modules\\compound-callback-subtree\\index.js'
	},
	'package.json': {
		'create-time': '2021-02-24T19:49:19.307+0100',
		'byte-size': '633 B',
		filepath: 'D:\\js\\node_modules\\compound-callback-subtree\\package.json'
	},
	'README.md': {
		'create-time': '2021-02-24T19:49:19.339+0100',
		'byte-size': '16.27 KB',
		filepath: 'D:\\js\\node_modules\\compound-callback-subtree\\README.md'
	},
	'monkey says': 'hoehoehaha'
}
*/
```