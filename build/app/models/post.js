"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Post = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    thumbnail: {
        type: String,
        required: true,
    },
    content: { type: String, required: true },
    shortContent: { type: String, required: true },
    authorId: { type: String, ref: "author", required: true },
    tagIds: [{ type: String, _id: false, ref: "tag", default: [] }],
    slug: { type: String, required: true },
    categoryId: { type: String, ref: "category", required: true },
    active: { type: Boolean, required: false, default: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("post", Post);
