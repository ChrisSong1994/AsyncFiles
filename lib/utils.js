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
exports.exit = exports.log = exports.rimrafPromify = exports.copyFiles = exports.pathIsFile = exports.to = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
/** 包装promise函数返回值
 * @param {Promise} promise
 */
exports.to = function (promise) {
    return promise
        .then(function (res) { return [null, res]; })
        .catch(function (err) { return [err, null]; });
};
/**  判断一个路径是目录还是文件
 * 1.假如存在用fs.stat 判断路径类型，不存在用path.extname判断
 * @param {String} pathStr
 * @returns {boolean}
 */
exports.pathIsFile = function (pathStr) { return __awaiter(void 0, void 0, void 0, function () {
    var stats;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!fs_extra_1.default.existsSync(pathStr)) return [3 /*break*/, 2];
                return [4 /*yield*/, fs_extra_1.default.promises.stat(pathStr)];
            case 1:
                stats = _a.sent();
                return [2 /*return*/, stats.isFile()];
            case 2: return [2 /*return*/, path_1.default.extname(pathStr) !== ""]; // 这里对于不存在的路径直接判断是否有后缀
        }
    });
}); };
/** 拷贝文件，对于目录会进行递归拷贝
 * @param {String}source
 * @param {String}target
 */
exports.copyFiles = function (source, target) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs_extra_1.default.copy(source, target)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/** rimraf 函数的promise 改造
 * @param {String} pathStr
 */
exports.rimrafPromify = function (pathStr) {
    return new Promise(function (resolve, reject) {
        rimraf_1.default(pathStr, function (error) {
            if (error)
                return reject(error);
            resolve();
        });
    });
};
exports.log = console.log.bind(console);
exports.exit = function (code, msg) {
    exports.log(msg);
    process.exit(code);
};
