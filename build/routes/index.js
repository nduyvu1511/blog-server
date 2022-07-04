"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./auth"));
var author_1 = __importDefault(require("./author"));
var category_1 = __importDefault(require("./category"));
var post_1 = __importDefault(require("./post"));
var upload_1 = __importDefault(require("./upload"));
var route = function (app) {
    app.use("/api/auth", auth_1.default);
    app.use("/api/author", author_1.default);
    app.use("/api/user", author_1.default);
    app.use("/api/post", post_1.default);
    app.use("/api/category", category_1.default);
    app.use("/api/upload", upload_1.default);
};
exports.default = route;
