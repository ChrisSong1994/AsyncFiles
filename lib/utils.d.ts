/** 包装promise函数返回值
 * @param {Promise} promise
 */
export declare const to: (promise: Promise<any>) => Promise<any>;
/**  判断一个路径是目录还是文件
 * 1.假如存在用fs.stat 判断路径类型，不存在用path.extname判断
 * @param {String} pathStr
 * @returns {boolean}
 */
export declare const pathIsFile: (pathStr: string) => Promise<Boolean>;
/** 拷贝文件，对于目录会进行递归拷贝
 * @param {String}source
 * @param {String}target
 */
export declare const copyFiles: (source: string, target: string) => Promise<void>;
/** rimraf 函数的promise 改造
 * @param {String} pathStr
 */
export declare const rimrafPromify: (pathStr: string) => Promise<any>;
export declare const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
