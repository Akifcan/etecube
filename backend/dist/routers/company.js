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
    const query = db_1.companyRepository.createQueryBuilder('company')
        .skip(page - 1)
        .take(limit)
        .orderBy('company.name', order);
    const totalRecord = yield db_1.companyRepository.count();
    if (req.query.name) {
        query.where('company.name like LOWER(:name)', { name: `%${req.query.name.toLowerCase()}%` });
    }
    const companies = yield query.getMany();
    res.status(200).json({ total: Math.ceil(totalRecord / limit), companies });
}));
router.get('/all', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield db_1.companyRepository.find();
    return res.status(200).json(companies);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield db_1.companyRepository.save(req.body);
    res.status(201).json(company);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield db_1.companyRepository.findOneByOrFail({ id: +req.params.id });
    res.status(200).json(company);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield db_1.companyRepository.delete({ id: +req.params.id });
    res.status(200).json(company);
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const company = yield db_1.companyRepository.update({ id: +req.params.id }, req.body);
    res.status(200).json(company);
}));
exports.default = router;
