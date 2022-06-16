"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const router = express_1.default.Router();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.userRepository.findOneBy({ email, password: (0, md5_1.default)(password) });
    user === null || user === void 0 ? true : delete user.password;
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET);
    if (!user) {
        res.status(403).json({ message: 'This user not found' });
    }
    return res.status(200).json({ token, user });
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    const isEmailExists = yield db_1.userRepository.findOneBy({ email });
    if (isEmailExists) {
        return res.status(403).json({ message: 'This email already registered' });
    }
    const saveUser = yield db_1.userRepository.save({ email, password: (0, md5_1.default)(password), lastName, firstName });
    const { password: userPassword } = saveUser, user = __rest(saveUser, ["password"]);
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
}));
exports.default = router;
