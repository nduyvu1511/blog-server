"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Category = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parentId: { type: String, ref: "category", required: false, default: "" },
    image: {
        type: String,
        default: "",
    },
    desc: { type: String, default: "" },
}, { timestamps: true });
exports.default = mongoose_1.default.model("category", Category);
