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
        .leftJoinAndSelect('product.company', 'company')
        .take(limit)
        .skip((page - 1) * limit);
    const totalRecord = yield db_1.productRepository.count();
    if (req.query.name) {
        query.where('product.name like LOWER(:name)', { name: `%${req.query.name.toLowerCase()}%` });
    }
    if (req.query.company) {
        query.where('product.company.id = :companyId', { companyId: +req.query.company });
    }
    if (req.query.category) {
        query.where('product.category = :category', { category: req.query.category });
    }
    if (req.query.order) {
        query.orderBy('product.name', order);
    }
    if (req.query.last) {
        query.orderBy('product.createdAt', 'DESC');
    }
    const products = yield query.getMany();
    res.status(200).json({ count: totalRecord, total: Math.ceil(totalRecord / limit), products });
}));
router.get('/categories', (_, res) => {
    res.status(200).json(['phone', 'laptop', 'car', 'headphone']);
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield db_1.productRepository.save(req.body);
    res.status(201).json(product);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db_1.productRepository.findOneOrFail({ where: { id: +req.params.id }, relations: ['company'] });
        res.status(200).json(product);
    }
    catch (e) {
        res.status(404).json({ message: 'not found' });
    }
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
