"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var author_1 = __importDefault(require("../models/author"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, name, password, pwHashed, newUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, name = _a.name, password = _a.password;
                        if (!email || !password)
                            return [2 /*return*/, res.json({ message: "missing required fields", success: false })];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, author_1.default.findOne({ email: email })];
                    case 2:
                        if (_b.sent()) {
                            return [2 /*return*/, res.json({ message: "Email is duplicate, please login", success: false })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                    case 3:
                        pwHashed = _b.sent();
                        newUser = new author_1.default(__assign(__assign({}, req.body), { name: name || email, password: pwHashed }));
                        return [4 /*yield*/, newUser.save()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                data: newUser,
                                message: "Create author successfully",
                                success: true,
                            })];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(400).send(error_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                token = req.locals.token;
                try {
                    return [2 /*return*/, res.json({
                            data: { token: token },
                            success: true,
                            message: "successfully",
                        })];
                }
                catch (error) {
                    return [2 /*return*/, res.status(400).send(error)];
                }
                return [2 /*return*/];
            });
        });
    };
    AuthController.prototype.changePassword = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, current_password, new_password, confirm_password, password, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = req.locals.user;
                        _a = req.body, current_password = _a.current_password, new_password = _a.new_password, confirm_password = _a.confirm_password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        if (!current_password || !new_password || !confirm_password)
                            return [2 /*return*/, res.json({ message: "missing required fields", success: false })];
                        if (confirm_password !== new_password)
                            return [2 /*return*/, res.json({
                                    message: "New password and current password must the same",
                                    success: false,
                                })];
                        return [4 /*yield*/, bcryptjs_1.default.compare(current_password, user.password)];
                    case 2:
                        if (!(_b.sent()))
                            return [2 /*return*/, res.json({ message: "Password is incorrect", success: false })];
                        if (new_password === current_password)
                            return [2 /*return*/, res.json({
                                    message: "New password must different from current password",
                                    success: false,
                                })];
                        return [4 /*yield*/, bcryptjs_1.default.hash(new_password, 10)];
                    case 3:
                        password = _b.sent();
                        return [4 /*yield*/, author_1.default.findByIdAndUpdate(user._id, {
                                $set: {
                                    password: password,
                                },
                            }, {
                                new: true,
                            })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                message: "Change password successfully",
                                success: true,
                            })];
                    case 5:
                        error_2 = _b.sent();
                        return [2 /*return*/, res.status(400).send(error_2)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.default = new AuthController();
