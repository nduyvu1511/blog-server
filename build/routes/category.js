"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_controller_1 = __importDefault(require("../app/controllers/category.controller"));
var token_middleware_1 = require("../app/middlewares/token.middleware");
var router = express_1.default.Router();
router.post("/add", token_middleware_1.verifyToken, category_controller_1.default.createCategory);
router.post("/update", token_middleware_1.verifyToken, category_controller_1.default.updateCategory);
router.post("/delete", token_middleware_1.verifyToken, category_controller_1.default.deleteCategory);
router.get("/", category_controller_1.default.getCategories);
router.get("/options", category_controller_1.default.getCategoryOptions);
exports.default = router;
