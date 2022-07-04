"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var author_controller_1 = __importDefault(require("../app/controllers/author.controller"));
var token_middleware_1 = require("../app/middlewares/token.middleware");
var router = express_1.default.Router();
router.get("/profile", token_middleware_1.verifyToken, author_controller_1.default.getProfile);
router.post("/update_profile", token_middleware_1.verifyToken, author_controller_1.default.updateProfile);
exports.default = router;
