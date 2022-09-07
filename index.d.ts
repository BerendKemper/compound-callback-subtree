import * as fs from "fs";
export = class CompoundCallbackSubtree {
    constructor(options: ConstructorOptions)
    /**
     * Generates a tree from the given `path`.
     * CompoundCallbackSubtree is asynchronous, for each instance only one process of generating a tree can be ran at a single time.
     * When invoking fromPath multiple times, these calls are queued to be running sequentially one after another.
     * ```javascript
        // posix no absolute path
        subtree.fromPath("./");
        {
            path: './',
            'index.d.ts': { path: 'index.d.ts' },
            'index.js': { path: 'index.js' },
            'MONKEY.json': { path: 'MONKEY.json' },
            'package.json': { path: 'package.json' },
            'README.md': { path: 'README.md' }
        }

        // posix with absolute path
        subtree.fromPath(path.posix.resolve("./"));
        {
            path: '/js/node_modules/compound-callback-subtree',
            'index.d.ts': { path: '/js/node_modules/compound-callback-subtree/index.d.ts' },
            'index.js': { path: '/js/node_modules/compound-callback-subtree/index.js' },
            'MONKEY.json': { path: '/js/node_modules/compound-callback-subtree/MONKEY.json' },
            'package.json': { path: '/js/node_modules/compound-callback-subtree/package.json' },
            'README.md': { path: '/js/node_modules/compound-callback-subtree/README.md' }
        }

        // win32 with absolute path (only if process.platform === "win32")
        subtree.fromPath(path.resolve("./"));
        {
            path: 'D:\\js\\node_modules\\compound-callback-subtree',
            'index.d.ts': { path: 'D:\\js\\node_modules\\compound-callback-subtree\\index.d.ts' },
            'index.js': { path: 'D:\\js\\node_modules\\compound-callback-subtree\\index.js' },
            'MONKEY.json': { path: 'D:\\js\\node_modules\\compound-callback-subtree\\MONKEY.json' },
            'package.json': { path: 'D:\\js\\node_modules\\compound-callback-subtree\\package.json' },
            'README.md': { path: 'D:\\js\\node_modules\\compound-callback-subtree\\README.md' }
        }
     * ```
     **/
    fromPath(path: string, callback?: returnTree): void
    /** The callback if the <fs.Stats> object describes a file system directory */
    dirStatCb?: statCallback;
    /** The callback if the <fs.Stats> object describes a regular file */
    fileStatCb?: statCallback;
    /** The callback for each file detected in a file system directory */
    subBranchCb?: subBranchCallback;
}
interface ConstructorOptions {
    /** The callback if the <fs.Stats> object describes a file system directory */
    dirStatCb?: statCallback;
    /** The callback if the <fs.Stats> object describes a regular file */
    fileStatCb?: statCallback;
    /** The callback for each file detected in a file system directory */
    subBranchCb?: subBranchCallback;
}
type returnTree = (tree: Branch) => void
type statCallback = (branchData: BranchDataStats, callback: () => void) => void
interface BranchDataStats {
    /** The branch object of the current file/directory is `branch`. */
    branch: object;
    /** The parent directory's branch object of the current file/directory is `dirbranch`. This property is only available after the first recursive subBranch. */
    dirbranch?: object;
    /** The parent directory's path string of the current file/directory is `dirpath`. */
    dirpath: string;
    /** The name of the current file/directory is `file`. */
    file: string;
    /** The path of the current file/directory is `path`. */
    path: string;
    /** The <fs.Stats> object of the current file/directory is `stats`. */
    stats: fs.Stats;
}
type subBranchCallback = (branchData: BranchDataBase, proceed: proceed, block?: () => void) => void
interface BranchDataBase {
    /** The parent directory's branch object of the current file/directory is `dirbranch`. */
    dirbranch: object;
    /** The parent directory's path string of the current file/directory is `dirpath`. */
    dirpath: string;
    /** The name of the current file/directory is `file`. */
    file: string;
    /** The path of the current file/directory is `path`. */
    path: string;
}
type proceed = (nextBranch?: Branch) => void
/** A tree is bare bone structure of empty objects called branches. It is up to the developer to insert relevant file/directory information into the branches of the tree. */
interface Branch {
    [file: string]: Branch
}