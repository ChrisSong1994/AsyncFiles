import path from "path";
import fs from "fs-extra";
import chokidar from "chokidar";
import { pathIsFile, copyFiles, rimrafPromify, log } from "./utils";

interface Options {
  source: string;
  target: string;
  watch?: boolean;
  ignoreInitial?: boolean;
}

/**
 *  功能介绍：基于chokidar进行监听并同步文件目录 source 到 target
 *  1.检查路径是否符合规范
 *  2.判断是监听的文件还是目录
 *  3.是否进行监听操作
 *  @param {Options} options
 */
class AsyncFiles {
  watch: boolean;
  ignoreInitial: Boolean;
  source: string;
  target: string;
  watcher: chokidar.FSWatcher | null;

  constructor(options: Options) {
    debugger;
    this.watch = options.watch || false; // 默认不监听
    this.ignoreInitial = options.ignoreInitial || false; // 默认不忽略第一次拷贝，只有当watch为true 的时候生效
    this.source = options.source;
    this.target = options.target;
    this.watcher = null;
    debugger;
    this.init();
  }

  async init() {
    /** 存在性判断
     * 1.source 必须存在
     * 2.source 和 target 不能相同
     * 3.source 和 target 必须是绝对路径
     * */
    if (!fs.existsSync(this.source)) return log("source不存在");
    if (!path.isAbsolute(this.source) || !path.isAbsolute(this.target))
      return log("source或者target必须是绝对路径");
    if (this.source === this.target) return log("source 和 target 不能相同");

    /** 路径类型判断
     * 1. 路径类型需要一致
     * 2. 假如是文件路径,则文件类型必须一致
     * */
    const sourcePathIsFile = await pathIsFile(this.source);
    const targetPathIsFile = await pathIsFile(this.target);
    if (sourcePathIsFile !== targetPathIsFile) return log("路径类型需要一致");
    if (sourcePathIsFile && targetPathIsFile) {
      if (path.extname(this.source) !== path.extname(this.target))
        return log("文件类型需要一致");
    }

    // 是否进行监听
    if (!this.watch) {
      // 假如目的路径存在先删除,再拷贝
      if (fs.existsSync(this.target)) await rimrafPromify(this.target);
      await copyFiles(this.source, this.target);
    } else {
      // 监听时才去判断是否进行初始化拷贝
      if (!this.ignoreInitial && fs.existsSync(this.target)) {
        await rimrafPromify(this.target);
        await copyFiles(this.source, this.target);
      }

      // 基本目录
      const sourceDir = sourcePathIsFile
        ? path.parse(this.source).dir
        : this.source;
      const targetDir = targetPathIsFile
        ? path.parse(this.target).dir
        : this.target;

      // 监听变化
      try {
        this.watcher = chokidar.watch(this.source, {
          persistent: true,
          ignoreInitial: true, // 初始化的时候不监听;
          /**  需要找到source 的目录当作相对路径的根路径
           * 1.当source是目录则cwd是当前目录
           * 2.当source是文件则 path.parse(this.source).dir作为当前目录
           * */
          cwd: sourceDir,
        });

        // 增加文件
        this.watcher.on("add", async (filePath) => {
          log(`File ${filePath} has been added`);
          await copyFiles(
            path.resolve(sourceDir, filePath),
            path.resolve(targetDir, filePath)
          );
        });

        // 增加文件夹
        this.watcher.on("addDir", async (dirPath) => {
          log(`Directory ${dirPath} has been added`);
          await copyFiles(
            path.resolve(sourceDir, dirPath),
            path.resolve(targetDir, dirPath)
          );
        });

        // 修改文件内容
        this.watcher.on("change", async (filePath) => {
          log(`File ${filePath} has been changed`);
          await copyFiles(
            path.resolve(sourceDir, filePath),
            path.resolve(targetDir, filePath)
          );
        });

        // 删除文件
        this.watcher.on("unlink", async (filePath) => {
          log(`File ${filePath} has been removed`);
          await rimrafPromify(path.resolve(targetDir, filePath));
        });

        // 删除文件夹
        this.watcher.on("unlinkDir", async (dirPath) => {
          log(`Directory ${dirPath} has been removed`);
          await rimrafPromify(path.resolve(targetDir, dirPath));
        });

        // 监听操作错误
        this.watcher.on("error", (error) => {
          // 报错
          log(`Watcher error: ${error}`);
          process.exit(1);
        });
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    }
  }

  // 关闭监听
  async close() {
    if (this.watcher) await this.watcher.close();
    this.watcher = null;
    process.exit();
  }
}

export default AsyncFiles;
