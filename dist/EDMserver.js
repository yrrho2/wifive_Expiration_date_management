"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const controller_1 = require("./controller/controller");
const dotenv_1 = __importDefault(require("dotenv"));
const dbconnect_1 = __importDefault(require("./dbconnect"));
dotenv_1.default.config();
const app = createServer();
const port = 4004;
function createServer() {
    const app = (0, express_1.default)();
    // app.use(express.json());
    // app.use(cookieParser());
    (0, dbconnect_1.default)().then(() => {
        app.use(express_1.default.json());
        app.use((0, cookie_parser_1.default)());
        const corsOptions = {
            origin: true,
            credentials: true,
            exposedHeaders: ['auth']
        };
        app.use((0, cors_1.default)(corsOptions));
        (0, controller_1.controller)(app);
    });
    // 컨트롤러 추가
    return app;
}
const server = http_1.default.createServer(app).listen(port, process.env.SERVER_HOST, () => {
    console.log(`[server]: Server is running at <${process.env.SERVER_HOST}>:${port}`);
});
