import chokidar from "chokidar";
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
declare class AsyncFiles {
    watch: boolean;
    source: string;
    target: string;
    watcher: chokidar.FSWatcher | null;
    constructor(options: Options);
    init(): Promise<void>;
    close(): Promise<void>;
}
export default AsyncFiles;
