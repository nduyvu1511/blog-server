"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = __importDefault(require("../app/controllers/auth.controller"));
var auth_middleware_1 = require("../app/middlewares/auth.middleware");
var token_middleware_1 = require("../app/middlewares/token.middleware");
var user_middleware_1 = require("../app/middlewares/user.middleware");
var router = express_1.default.Router();
router.post("/register", auth_controller_1.default.register);
router.post("/login", auth_middleware_1.loginMiddleWare, auth_controller_1.default.login);
router.post("/change_password", token_middleware_1.verifyToken, user_middleware_1.getUser, auth_controller_1.default.changePassword);
exports.default = router;
