"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_controller_1 = __importDefault(require("../app/controllers/post.controller"));
var token_middleware_1 = require("../app/middlewares/token.middleware");
var router = express_1.default.Router();
router.post("/add", token_middleware_1.verifyToken, post_controller_1.default.createPost);
router.post("/delete", token_middleware_1.verifyToken, post_controller_1.default.deletePost);
router.post("/restore", token_middleware_1.verifyToken, post_controller_1.default.restorePost);
router.post("/update", token_middleware_1.verifyToken, post_controller_1.default.updatePost);
router.get("/", post_controller_1.default.getPosts);
router.get("/:postId", post_controller_1.default.getPostDetail);
router.get("/category/:categoryId", post_controller_1.default.getPostsByCategory);
exports.default = router;
