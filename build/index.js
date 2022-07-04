"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes"));
require("dotEnv").config();
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use(express_1.default.json({ limit: "10mb" }));
config_1.default.connect();
app.use((0, morgan_1.default)("combined"));
var corsConfig = {
    origin: true,
    Credential: true,
};
app.use((0, cors_1.default)(corsConfig));
(0, routes_1.default)(app);
app.listen(PORT, function () {
    console.log("App listening at port ".concat(PORT));
});
