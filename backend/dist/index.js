"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("./routers/auth"));
const company_1 = __importDefault(require("./routers/company"));
const product_1 = __importDefault(require("./routers/product"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
const authGuard = (req, res, next) => {
    var _a;
    if (!req.headers.authorization) {
        res.status(403).json({ message: 'no token provided' });
    }
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
};
db_1.default.initialize()
    .then(() => {
    app.use('/auth', auth_1.default);
    app.use('/company', authGuard, company_1.default);
    app.use('/product', authGuard, product_1.default);
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}).catch(error => {
    console.log(error);
});
