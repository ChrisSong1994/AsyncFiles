import path from "path";
import rimraf from "rimraf";
import fs from "fs-extra";
import chokidar from 'chokidar'

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
  constructor(options: Options) {
    this.watch = options.watch || false; // 默认不监听
    this.source = options.source;
    this.target = options.source;
  }

  init() {}
}

export default AsyncFiles;
