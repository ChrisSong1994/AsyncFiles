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
var fs_extra_1 = __importDefault(require("fs-extra"));
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
        debugger;
        this.watch = options.watch || false; // 默认不监听
        this.ignoreInitial = options.ignoreInitial || false; // 默认不忽略第一次拷贝，只有当watch为true 的时候生效
        this.source = options.source;
        this.target = options.target;
        this.watcher = null;
        this.init();
    }
    AsyncFiles.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sourcePathIsFile, targetPathIsFile, sourceDir_1, targetDir_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 进程
                        process.on("SIGINT", function (signal) { return utils_1.exit(0, "\u270B\u63A5\u6536\u5230\u4FE1\u53F7" + signal + "\u9000\u51FA"); });
                        process.on("SIGINT", function (signal) { return utils_1.exit(0, "\u270B\u63A5\u6536\u5230\u4FE1\u53F7" + signal + "\u9000\u51FA"); });
                        /** 存在性判断
                         * 1.source 必须存在
                         * 2.source 和 target 不能相同
                         * 3.source 和 target 必须是绝对路径
                         * */
                        if (!fs_extra_1.default.existsSync(this.source))
                            throw new Error("\u8DEF\u5F84" + this.source + "\u4E0D\u5B58\u5728");
                        if (!path_1.default.isAbsolute(this.source) || !path_1.default.isAbsolute(this.target))
                            throw new Error("\u8DEF\u5F84" + this.source + "\u548C" + this.target + "\u5FC5\u987B\u662F\u7EDD\u5BF9\u8DEF\u5F84");
                        if (this.source === this.target)
                            throw new Error(this.source + "\u548C" + this.target + "\u4E0D\u80FD\u662F\u76F8\u540C\u8DEF\u5F84");
                        return [4 /*yield*/, utils_1.pathIsFile(this.source)];
                    case 1:
                        sourcePathIsFile = _a.sent();
                        return [4 /*yield*/, utils_1.pathIsFile(this.target)];
                    case 2:
                        targetPathIsFile = _a.sent();
                        if (sourcePathIsFile !== targetPathIsFile)
                            throw new Error(this.source + "\u548C" + this.target + "\u8DEF\u5F84\u7C7B\u578B\u9700\u8981\u4E00\u81F4");
                        if (sourcePathIsFile && targetPathIsFile) {
                            if (path_1.default.extname(this.source) !== path_1.default.extname(this.target))
                                throw new Error(this.source + "\u548C" + this.target + "\u6587\u4EF6\u7C7B\u578B\u9700\u8981\u4E00\u81F4");
                        }
                        if (!!this.watch) return [3 /*break*/, 6];
                        if (!fs_extra_1.default.existsSync(this.target)) return [3 /*break*/, 4];
                        return [4 /*yield*/, utils_1.rimrafPromify(this.target)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, utils_1.copyFiles(this.source, this.target)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        if (!(!this.ignoreInitial && fs_extra_1.default.existsSync(this.target))) return [3 /*break*/, 9];
                        return [4 /*yield*/, utils_1.rimrafPromify(this.target)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, utils_1.copyFiles(this.source, this.target)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        sourceDir_1 = sourcePathIsFile
                            ? path_1.default.parse(this.source).dir
                            : this.source;
                        targetDir_1 = targetPathIsFile
                            ? path_1.default.parse(this.target).dir
                            : this.target;
                        // 监听变化
                        try {
                            this.watcher = chokidar_1.default.watch(this.source, {
                                persistent: true,
                                ignoreInitial: true,
                                /**  需要找到source 的目录当作相对路径的根路径
                                 * 1.当source是目录则cwd是当前目录
                                 * 2.当source是文件则 path.parse(this.source).dir作为当前目录
                                 * */
                                cwd: sourceDir_1,
                            });
                            // 增加文件
                            this.watcher.on("add", function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            utils_1.log("File " + filePath + " has been added");
                                            return [4 /*yield*/, utils_1.copyFiles(path_1.default.resolve(sourceDir_1, filePath), path_1.default.resolve(targetDir_1, filePath))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // 增加文件夹
                            this.watcher.on("addDir", function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            utils_1.log("Directory " + dirPath + " has been added");
                                            return [4 /*yield*/, fs_extra_1.default.mkdir(path_1.default.resolve(targetDir_1, dirPath))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // 修改文件内容
                            this.watcher.on("change", function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            utils_1.log("File " + filePath + " has been changed");
                                            return [4 /*yield*/, utils_1.rimrafPromify(path_1.default.resolve(targetDir_1, filePath))];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, utils_1.copyFiles(path_1.default.resolve(sourceDir_1, filePath), path_1.default.resolve(targetDir_1, filePath))];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // 删除文件
                            this.watcher.on("unlink", function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            utils_1.log("File " + filePath + " has been removed");
                                            return [4 /*yield*/, utils_1.rimrafPromify(path_1.default.resolve(targetDir_1, filePath))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // 删除文件夹
                            this.watcher.on("unlinkDir", function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            utils_1.log("Directory " + dirPath + " has been removed");
                                            return [4 /*yield*/, utils_1.rimrafPromify(path_1.default.resolve(targetDir_1, dirPath))];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // 监听操作错误
                            this.watcher.on("error", function (error) {
                                // 报错
                                utils_1.log("Watcher error: " + error);
                                process.exit(1);
                            });
                        }
                        catch (err) {
                            process.exit(1);
                        }
                        _a.label = 10;
                    case 10: return [2 /*return*/];
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
