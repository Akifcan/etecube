"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routers/auth"));
const company_1 = __importDefault(require("./routers/company"));
const product_1 = __importDefault(require("./routers/product"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3000;
db_1.default.initialize()
    .then(() => {
    app.use('/auth', auth_1.default);
    app.use('/company', middleware_1.authGuard, company_1.default);
    app.use('/product', middleware_1.authGuard, product_1.default);
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}).catch(error => {
    console.log(error);
});
