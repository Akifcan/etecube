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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = require("../db");
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? +req.query.page : 1;
    const order = req.query.order || 'ASC';
    const limit = 5;
    const query = db_1.productRepository.createQueryBuilder('product')
        .skip(page - 1)
        .take(limit)
        .orderBy('product.name', order);
    const totalRecord = yield db_1.productRepository.count();
    if (req.query.name) {
        query.where('product.name like LOWER(:name)', { name: `%${req.query.name.toLowerCase()}%` });
    }
    const products = yield query.getMany();
    res.status(200).json({ total: Math.ceil(totalRecord / limit), products });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.productRepository.save(req.body);
    res.status(201).json(product);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.productRepository.findOneBy({ id: +req.params.id });
    res.status(200).json(product);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.productRepository.delete({ id: +req.params.id });
    res.status(200).json(product);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.productRepository.update({ id: +req.params.id }, req.body);
    res.status(200).json(product);
}));
exports.default = router;
