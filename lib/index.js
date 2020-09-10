"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var chokidar_1 = __importDefault(require("chokidar"));
var utils_1 = require("./utils");
/**
 *  功能介绍：基于chokidar进行监听并同步文件目录 source 到 target
 *  1.检查路径是否符合规范
 *  2.判断是监听的文件还是目录
 *  3.是否进行监听操作
 *  @param {Options} options
 */
var AsyncFiles = /** @class */ (function () {
    function AsyncFiles(options) {
        this.watch = options.watch || false; // 默认不监听
        this.source = options.source;
        this.target = options.source;
        this.watcher = null;
    }
    // 初始化
    AsyncFiles.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sourcePathIsFile, targetPathIsFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 存在性判断
                        if (!utils_1.isPathExists(this.source) || this.source === this.target)
                            return [2 /*return*/];
                        return [4 /*yield*/, utils_1.pathIsFile(this.source)];
                    case 1:
                        sourcePathIsFile = _a.sent();
                        return [4 /*yield*/, utils_1.pathIsFile(this.target)];
                    case 2:
                        targetPathIsFile = _a.sent();
                        if (sourcePathIsFile !== targetPathIsFile)
                            return [2 /*return*/];
                        if (!utils_1.isPathExists(this.target)) return [3 /*break*/, 4];
                        return [4 /*yield*/, utils_1.rimrafPromify(this.target)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: 
                    // 进行拷贝
                    return [4 /*yield*/, utils_1.copyFiles(this.source, this.target)];
                    case 5:
                        // 进行拷贝
                        _a.sent();
                        // 是否进行监听
                        if (this.watch) {
                            try {
                                this.watcher = chokidar_1.default.watch(this.source, {
                                    persistent: true,
                                    ignoreInitial: true,
                                    cwd: path_1.default.parse(this.source).dir,
                                });
                                this.watcher
                                    .on("add", function (path) {
                                    // 增加文件
                                    utils_1.log("File " + path + " has been added");
                                })
                                    .on("change", function (path, stats) {
                                    // 修改文件
                                    utils_1.log("File " + path + " has been changed");
                                    utils_1.log(path, stats);
                                })
                                    .on("unlink", function (path) {
                                    // 删除文件
                                    utils_1.log("File " + path + " has been removed");
                                })
                                    .on("addDir", function (path) {
                                    utils_1.log("Directory " + path + " has been added");
                                })
                                    .on("unlinkDir", function (path) {
                                    // 删除文件夹
                                    utils_1.log("Directory " + path + " has been removed");
                                })
                                    .on("error", function (error) {
                                    // 报错
                                    utils_1.log("Watcher error: " + error);
                                    process.exit(1);
                                });
                            }
                            catch (err) {
                                console.error(err);
                                process.exit(1);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 关闭监听
    AsyncFiles.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.watcher) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.watcher.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.watcher = null;
                        process.exit();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AsyncFiles;
}());
exports.default = AsyncFiles;
