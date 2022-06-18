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
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.userRepository.delete({});
    yield db_1.companyRepository.delete({});
    yield db_1.productRepository.delete({});
    // Create Users
    const user1 = yield db_1.userRepository.save({ firstName: 'akifcan', lastName: 'kara', email: 'akif@mail.com', password: '827ccb0eea8a706c4c34a16891f84e7b' });
    const user2 = yield db_1.userRepository.save({ firstName: 'john', lastName: 'doe', email: 'john@mail.com', password: '827ccb0eea8a706c4c34a16891f84e7b' });
    const user3 = yield db_1.userRepository.save({ firstName: 'lena', lastName: 'doe', email: 'lena@gmail.com', password: '827ccb0eea8a706c4c34a16891f84e7b' });
    // Create Companies
    const company1 = yield db_1.companyRepository.save({ name: 'microsoft', legalNumber: '535', country: 'usa', 'website': 'www.microsoft.com' });
    const company2 = yield db_1.companyRepository.save({ name: 'lenovo', legalNumber: '135', country: 'china', 'website': 'www.lenovo.com' });
    const company3 = yield db_1.companyRepository.save({ name: 'atlassian', legalNumber: '235', country: 'australia', 'website': 'www.atlassian.com' });
    const company4 = yield db_1.companyRepository.save({ name: 'github', legalNumber: '535', country: 'usa', 'website': 'www.github.com' });
    const company5 = yield db_1.companyRepository.save({ name: 'facebook', legalNumber: '535', country: 'usa', 'website': 'www.facebook.com' });
    // Create Products
    const product1 = yield db_1.productRepository.save({ name: 'ms surface', amount: 10, category: 'phone', company: company1 });
    const product2 = yield db_1.productRepository.save({ name: 'ms surface 2', amount: 20, category: 'phone', company: company1 });
    const product3 = yield db_1.productRepository.save({ name: 'nokia lumia 520', amount: 40, category: 'phone', company: company1 });
    const product4 = yield db_1.productRepository.save({ name: 'lenovo yoga', amount: 20, category: 'laptop', company: company2 });
    const product5 = yield db_1.productRepository.save({ name: 'lenovo yoga 530', amount: 10, category: 'laptop', company: company2 });
    const product6 = yield db_1.productRepository.save({ name: 'bitbucket', amount: 10, category: 'car', company: company3 });
    const product7 = yield db_1.productRepository.save({ name: 'jira', amount: 500, category: 'car', company: company3 });
    const product8 = yield db_1.productRepository.save({ name: 'github tablet', amount: 20, category: 'laptop', company: company4 });
    const product9 = yield db_1.productRepository.save({ name: 'github cpu', amount: 10, category: 'laptop', company: company4 });
    const product10 = yield db_1.productRepository.save({ name: 'instagram', amount: 10, category: 'headphone', company: company5 });
    res.status(201).json({
        user1, user2, user3,
        company1, company2, company3, company4, company5,
        product1, product2, product3, product4, product5, product6, product7, product8, product9, product10
    });
}));
exports.default = router;
