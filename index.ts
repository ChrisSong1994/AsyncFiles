import path from "path";
import fs from "fs-extra";
import chokidar from "chokidar";
import {
  isPathExists,
  pathIsFile,
  copyFiles,
  rimrafPromify,
  log,
} from "./utils";

interface Options {
  source: string;
  target: string;
  watch?: boolean;
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
  source: string;
  target: string;
  watcher: chokidar.FSWatcher | null;
  constructor(options: Options) {
    this.watch = options.watch || false; // 默认不监听
    this.source = options.source;
    this.target = options.source;
    this.watcher = null;
  }

  // 初始化
  async init() {
    // 存在性判断
    if (!isPathExists(this.source) || this.source === this.target) return;

    // 路径类型判断
    const sourcePathIsFile = await pathIsFile(this.source);
    const targetPathIsFile = await pathIsFile(this.target);
    if (sourcePathIsFile !== targetPathIsFile) return;

    // 假如目的路径存在先删除
    if (isPathExists(this.target)) await rimrafPromify(this.target);

    // 进行拷贝
    await copyFiles(this.source, this.target);

    // 是否进行监听
    if (this.watch) {
      try {
        this.watcher = chokidar.watch(this.source, {
          persistent: true,
          ignoreInitial: true, // 初始化的时候不监听;
          cwd: path.parse(this.source).dir, // 需要找到source 的目录当作相对路径的根路径
        });
        this.watcher
          .on("add", (path) => {
            // 增加文件
            log(`File ${path} has been added`);
          })
          .on("change", (path, stats) => {
            // 修改文件
            log(`File ${path} has been changed`);
            log(path, stats);
          })
          .on("unlink", (path) => {
            // 删除文件
            log(`File ${path} has been removed`);
          })
          .on("addDir", (path) => {
            log(`Directory ${path} has been added`);
          })
          .on("unlinkDir", (path) => {
            // 删除文件夹
            log(`Directory ${path} has been removed`);
          })
          .on("error", (error) => {
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
