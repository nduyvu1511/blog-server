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
var constant_1 = require("../../helpers/constant");
var author_1 = __importDefault(require("../models/author"));
var category_1 = __importDefault(require("../models/category"));
var post_1 = __importDefault(require("../models/post"));
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.createPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var authorId, _a, title, content, shortContent, categoryId, slug, thumbnail, newPost, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        authorId = req.locals.authorId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        _a = req.body, title = _a.title, content = _a.content, shortContent = _a.shortContent, categoryId = _a.categoryId, slug = _a.slug, thumbnail = _a.thumbnail;
                        if (!title || !content || !shortContent || !categoryId || !slug || !thumbnail)
                            return [2 /*return*/, res.json({ message: "missing required fields", success: false })];
                        if (!constant_1.OBJECT_ID_REGEX.test(categoryId)) {
                            return [2 /*return*/, res.json({ message: "Invalid category id", success: false })];
                        }
                        return [4 /*yield*/, category_1.default.findById(categoryId)];
                    case 2:
                        if (!(_b.sent())) {
                            return [2 /*return*/, res.json({ message: "Category not found", success: false })];
                        }
                        return [4 /*yield*/, post_1.default.findOne({ slug: slug })];
                    case 3:
                        if (_b.sent()) {
                            return [2 /*return*/, res.json({
                                    message: "Slug is duplicate, please choose a unique slug",
                                    success: false,
                                })];
                        }
                        newPost = new post_1.default(__assign(__assign({}, req.body), { authorId: authorId }));
                        return [4 /*yield*/, newPost.save()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                message: "Create post successfully",
                                success: true,
                                data: newPost,
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
    PostController.prototype.deletePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postId = req.body.postId;
                        if (!postId)
                            return [2 /*return*/, res.json({ message: "missing post id", success: false })];
                        return [4 /*yield*/, post_1.default.findByIdAndUpdate(postId, { $set: { active: false } }, { new: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                message: "delete post successfully",
                                success: true,
                                data: { postId: postId },
                            })];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(400).send(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.restorePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postId = req.body.postId;
                        if (!postId)
                            return [2 /*return*/, res.json({ message: "missing post id", success: false })];
                        return [4 /*yield*/, post_1.default.findByIdAndUpdate(postId, { $set: { active: true } }, { new: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.json({
                                message: "restore post successfully",
                                success: true,
                                data: { postId: postId },
                            })];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, res.status(400).send(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.updatePost = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, postId, params, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _b = req.body, postId = _b.postId, params = __rest(_b, ["postId"]);
                        if (!postId)
                            return [2 /*return*/, res.json({ message: "missing post id", success: false })];
                        if (!((_a = Object.keys(params)) === null || _a === void 0 ? void 0 : _a.length)) {
                            return [2 /*return*/, res.json({ message: "Nothing to update", success: false })];
                        }
                        return [4 /*yield*/, post_1.default.findByIdAndUpdate(postId, params, { new: true })];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, res.json({
                                message: "update post successfully",
                                success: true,
                                data: { postId: postId },
                            })];
                    case 2:
                        error_4 = _c.sent();
                        console.log(error_4);
                        return [2 /*return*/, res.status(400).send(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getPosts = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var limit, offset, categoryId, query, posts, newPosts, error_5;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        limit = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) || 12;
                        offset = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.offset) || 0;
                        categoryId = req.query.categoryId;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        query = categoryId ? { categoryId: categoryId, active: true } : { active: true };
                        return [4 /*yield*/, post_1.default.find(query)
                                .select([
                                "_id",
                                "title",
                                "thumbnail",
                                "subTitle",
                                "shortContent",
                                "Id",
                                "slug",
                                "categoryId",
                                "createdAt",
                                "updatedAt",
                                "authorId",
                            ])
                                .limit(limit)
                                .skip(limit * offset)
                                .sort({ createdAt: -1 })
                                .lean()];
                    case 2:
                        posts = (_c.sent()) || [];
                        return [4 /*yield*/, Promise.all(posts.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var author, category;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, author_1.default.findById(item.authorId)];
                                        case 1:
                                            author = _a.sent();
                                            return [4 /*yield*/, category_1.default.findById(item.categoryId)];
                                        case 2:
                                            category = _a.sent();
                                            return [2 /*return*/, {
                                                    postId: item._id,
                                                    category: {
                                                        categoryId: item.categoryId,
                                                        categoryName: (category === null || category === void 0 ? void 0 : category.name) || "",
                                                    },
                                                    content: item.content,
                                                    shortContent: item.shortContent,
                                                    slug: item.slug,
                                                    subTitle: item.subTitle,
                                                    tags: (item === null || item === void 0 ? void 0 : item.tags) || [],
                                                    thumbnail: item.thumbnail,
                                                    title: item.title,
                                                    author: {
                                                        authorId: item.authorId,
                                                        authorName: author === null || author === void 0 ? void 0 : author.name,
                                                    },
                                                    createdAt: item.createdAt,
                                                }];
                                    }
                                });
                            }); }))];
                    case 3:
                        newPosts = _c.sent();
                        return [2 /*return*/, res.json({
                                message: "Congratulations",
                                success: true,
                                data: newPosts,
                            })];
                    case 4:
                        error_5 = _c.sent();
                        console.log(error_5);
                        return [2 /*return*/, res.status(400).send(error_5)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getPostDetail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, slug, query, post, author, category, postRes, relatedPostsRes, relatedPosts, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        postId = req.params.postId;
                        slug = req.query.slug;
                        if (!postId && !slug)
                            return [2 /*return*/, res.json({ message: "Missing post id", success: false })];
                        query = postId ? { _id: postId } : { slug: slug };
                        return [4 /*yield*/, post_1.default.findOne(query)];
                    case 1:
                        post = _a.sent();
                        if (!post || !post.active)
                            return [2 /*return*/, res.json({ message: "Post not found", success: false })];
                        return [4 /*yield*/, author_1.default.findById(post === null || post === void 0 ? void 0 : post.authorId)];
                    case 2:
                        author = _a.sent();
                        return [4 /*yield*/, category_1.default.findById(post === null || post === void 0 ? void 0 : post.categoryId)];
                    case 3:
                        category = _a.sent();
                        postRes = {
                            postId: postId,
                            title: post.title,
                            shortContent: post.shortContent,
                            content: (post === null || post === void 0 ? void 0 : post.content) || "",
                            thumbnail: post.thumbnail,
                            slug: post.slug,
                            subTitle: post.subTitle,
                            tags: (post === null || post === void 0 ? void 0 : post.tags) || [],
                            createdAt: (post === null || post === void 0 ? void 0 : post.createdAt) || "",
                            author: {
                                authorId: (author === null || author === void 0 ? void 0 : author._id) || "",
                                authorName: (author === null || author === void 0 ? void 0 : author.name) || "",
                            },
                            category: {
                                categoryId: (post === null || post === void 0 ? void 0 : post.categoryId) || "",
                                categoryName: (category === null || category === void 0 ? void 0 : category.name) || "",
                            },
                        };
                        if (postId)
                            return [2 /*return*/, res.json({
                                    message: "Congratulations",
                                    success: true,
                                    data: postRes,
                                })];
                        return [4 /*yield*/, post_1.default.find({
                                $and: [{ categoryId: post.categoryId }, { _id: { $ne: postId } }],
                            })
                                .select([
                                "_id",
                                "slug",
                                "thumbnail",
                                "shortTitle",
                                "shortContent",
                                "createdAt",
                                "categoryId",
                                "authorId",
                            ])
                                .sort({ createdAt: -1 })
                                .limit(8)
                                .lean()];
                    case 4:
                        relatedPostsRes = (_a.sent()) || [];
                        relatedPosts = relatedPostsRes.map(function (item) { return ({
                            postId: item._id,
                            slug: item.slug,
                            subTitle: item.subTitle,
                            shortContent: item.shortContent,
                            thumbnail: item.thumbnail,
                            createdAt: item.createdAt,
                        }); });
                        return [2 /*return*/, res.json({
                                message: "Congratulations",
                                success: true,
                                data: __assign(__assign({}, postRes), { relatedPosts: relatedPosts }),
                            })];
                    case 5:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2 /*return*/, res.status(400).send(error_6)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getPostsByCategory = function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var limit, offset, categoryId, posts, postsRes, error_7;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        limit = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.limit) || 12;
                        offset = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.offset) || 0;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        categoryId = req.params.categoryId;
                        if (!categoryId)
                            return [2 /*return*/, res.json({ message: "Missing post id", success: false })];
                        return [4 /*yield*/, post_1.default.find({
                                $and: [{ categoryId: categoryId }, { active: true }],
                            })
                                .select([
                                ,
                                "postId",
                                "title",
                                "shortContent",
                                "content",
                                "thumbnail",
                                "slug",
                                "subTitle",
                                "tags",
                                "createdAt",
                                "categoryId",
                                "authorId",
                            ])
                                .sort({ createdAt: -1 })
                                .skip(offset * limit)
                                .limit(limit)
                                .lean()];
                    case 2:
                        posts = _c.sent();
                        return [4 /*yield*/, Promise.all(posts.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var author, category;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, author_1.default.findById(item === null || item === void 0 ? void 0 : item.authorId)];
                                        case 1:
                                            author = _a.sent();
                                            return [4 /*yield*/, category_1.default.findById(item === null || item === void 0 ? void 0 : item.categoryId)];
                                        case 2:
                                            category = _a.sent();
                                            return [2 /*return*/, {
                                                    postId: item._id,
                                                    title: item.title,
                                                    shortContent: item.shortContent,
                                                    content: (item === null || item === void 0 ? void 0 : item.content) || "",
                                                    thumbnail: item.thumbnail,
                                                    slug: item.slug,
                                                    subTitle: item.subTitle,
                                                    tags: (item === null || item === void 0 ? void 0 : item.tags) || [],
                                                    createdAt: (item === null || item === void 0 ? void 0 : item.createdAt) || "",
                                                    author: {
                                                        authorId: item.authorId,
                                                        authorName: (author === null || author === void 0 ? void 0 : author.name) || "",
                                                    },
                                                    category: {
                                                        categoryId: (item === null || item === void 0 ? void 0 : item.categoryId) || "",
                                                        categoryName: (category === null || category === void 0 ? void 0 : category.name) || "",
                                                    },
                                                }];
                                    }
                                });
                            }); }))];
                    case 3:
                        postsRes = _c.sent();
                        return [2 /*return*/, res.json({
                                message: "Congratulations",
                                success: true,
                                data: postsRes,
                            })];
                    case 4:
                        error_7 = _c.sent();
                        console.log(error_7);
                        return [2 /*return*/, res.status(400).send(error_7)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
exports.default = new PostController();
