"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var constant_1 = require("../../helpers/constant");
var functions_1 = require("../../helpers/functions");
var Author = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    avatar: {
        type: String,
        required: false,
        validate: [functions_1.validateUrl, "Invalid image url"],
        match: [constant_1.URL_REGEX, "Invalid image url"],
    },
    bio: { type: String },
    email: {
        type: String,
        required: true,
        validate: [functions_1.validateEmail, "Invalid email"],
        match: [constant_1.EMAIL_REGEX, "Invalid email"],
        unique: true,
    },
    password: { type: String, min: 6, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("author", Author);
