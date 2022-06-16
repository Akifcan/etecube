"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const auth_1 = __importDefault(require("./routers/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
db_1.default.initialize()
    .then(() => {
    console.log("connected");
    app.use('/auth', auth_1.default);
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}).catch(error => {
    console.log(error);
});
