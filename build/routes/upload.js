"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var upload_controller_1 = __importDefault(require("../app/controllers/upload.controller"));
var token_middleware_1 = require("../app/middlewares/token.middleware");
var router = express_1.default.Router();
router.post("/", token_middleware_1.verifyToken, upload_controller_1.default.uploadImage);
exports.default = router;
