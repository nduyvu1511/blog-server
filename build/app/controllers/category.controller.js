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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("../../helpers/functions");
var category_1 = __importDefault(require("../models/category"));
var post_1 = __importDefault(require("../models/post"));
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    CategoryController.prototype.createCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, slug, category, categoryRes, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        data = req.body;
                        if (!(data === null || data === void 0 ? void 0 : data.name) || !(data === null || data === void 0 ? void 0 : data.slug)) {
                            return [2 /*return*/, res.json({ message: "Mising required fields", success: false })];
                        }
                        slug = (0, functions_1.convertViToEn)(data.slug.trim().toLowerCase()).replace(/\s+/g, "-");
                        return [4 /*yield*/, category_1.default.findOne({ slug: slug })];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, res.json({ message: "Slug is duplicate", success: false })];
                        }
                        category = new category_1.default(__assign(__assign({}, data), { slug: slug }));
                        return [4 /*yield*/, category.save()];
                    case 2:
                        _a.sent();
                        categoryRes = {
                            categoryId: category._id,
                            desc: (category === null || category === void 0 ? void 0 : category.desc) || "",
                            image: (category === null || category === void 0 ? void 0 : category.image) || "",
                            parentId: (category === null || category === void 0 ? void 0 : category.parentId) || "",
                            slug: category.slug,
                            name: category.name,
                            createdAt: category.createdAt,
                            postCount: 0,
                        };
                        return [2 /*return*/, res.json({
                                data: categoryRes,
                                success: true,
                                message: "Congratulations",
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.deleteCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var categoryId, posts, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        categoryId = req.body.categoryId;
                        if (!categoryId) {
                            return [2 /*return*/, res.json({ message: "missing category id", success: false })];
                        }
                        return [4 /*yield*/, post_1.default.countDocuments({ categoryId: categoryId })];
                    case 1:
                        posts = _a.sent();
                        if (posts > 0) {
                            return [2 /*return*/, res.json({
                                    message: "You can not delete this category because it contains posts",
                                    success: false,
                                })];
                        }
                        return [4 /*yield*/, category_1.default.findByIdAndRemove(categoryId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                data: { categoryId: categoryId },
                                success: true,
                                message: "Congratulations",
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, res.status(400).send(error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.updateCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, categoryId, data, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, categoryId = _a.categoryId, data = __rest(_a, ["categoryId"]);
                        if (!Object.keys(data).length) {
                            return [2 /*return*/, res.json({ message: "Nothing to update", success: false })];
                        }
                        if (!categoryId) {
                            return [2 /*return*/, res.json({ message: "missing category id", success: false })];
                        }
                        if (data === null || data === void 0 ? void 0 : data.slug) {
                            data.slug = (0, functions_1.convertViToEn)(data.slug.trim().toLowerCase()).replace(/\s+/g, "-");
                        }
                        return [4 /*yield*/, category_1.default.findByIdAndUpdate(categoryId, data, { new: true })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                data: data,
                                success: true,
                                message: "Congratulations",
                            })];
                    case 2:
                        error_3 = _b.sent();
                        return [2 /*return*/, res.status(400).send(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.getCategories = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, newCategories;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, category_1.default.find().lean()];
                    case 1:
                        categories = (_a.sent()) || [];
                        return [4 /*yield*/, Promise.all(categories.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var postCount;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, post_1.default.countDocuments({ $and: [{ categoryId: item._id }, { active: true }] })];
                                        case 1:
                                            postCount = (_a.sent()) || 0;
                                            return [2 /*return*/, {
                                                    categoryId: item._id,
                                                    createdAt: item.createdAt,
                                                    desc: (item === null || item === void 0 ? void 0 : item.desc) || "",
                                                    image: (item === null || item === void 0 ? void 0 : item.image) || "",
                                                    parentId: (item === null || item === void 0 ? void 0 : item.parentId) || "",
                                                    postCount: postCount,
                                                    slug: item.slug,
                                                    name: item.name,
                                                }];
                                    }
                                });
                            }); }))];
                    case 2:
                        newCategories = _a.sent();
                        try {
                            return [2 /*return*/, res.json({
                                    data: newCategories,
                                    success: true,
                                    message: "Congratulations",
                                })];
                        }
                        catch (error) {
                            return [2 /*return*/, res.status(400).send(error)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.getCategoryOptions = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, newCategories;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, category_1.default.find()
                            .select(["categoryId", "createdAt", "image", "slug", "desc", "name", "parentId"])
                            .lean()];
                    case 1:
                        categories = (_a.sent()) || [];
                        return [4 /*yield*/, Promise.all(categories.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, {
                                            categoryId: item._id,
                                            createdAt: item.createdAt,
                                            desc: (item === null || item === void 0 ? void 0 : item.desc) || "",
                                            image: (item === null || item === void 0 ? void 0 : item.image) || "",
                                            parentId: (item === null || item === void 0 ? void 0 : item.image) || "",
                                            slug: item.slug,
                                            name: item.name,
                                        }];
                                });
                            }); }))];
                    case 2:
                        newCategories = _a.sent();
                        try {
                            return [2 /*return*/, res.json({
                                    data: newCategories,
                                    success: true,
                                    message: "Congratulations",
                                })];
                        }
                        catch (error) {
                            return [2 /*return*/, res.status(400).send(error)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CategoryController;
}());
exports.default = new CategoryController();
