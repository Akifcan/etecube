"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = exports.companyRepository = exports.userRepository = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const typeorm_1 = require("typeorm");
const company_1 = require("./entity/company");
const product_1 = require("./entity/product");
const user_1 = require("./entity/user");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "ec2-44-196-223-128.compute-1.amazonaws.com",
    port: 5432,
    username: "yfsapcaswrdtsi",
    password: "763ff185b5009d5ccbd776bfc1d3bba0fadffc9bb6c0fb88dc6dcd6641fee4e5",
    database: "deb0a8t0lbotca",
    entities: [user_1.User, company_1.Company, product_1.Product],
    synchronize: true,
    logging: false,
    ssl: {
        rejectUnauthorized: false
    }
});
const userRepository = AppDataSource.getRepository(user_1.User);
exports.userRepository = userRepository;
const companyRepository = AppDataSource.getRepository(company_1.Company);
exports.companyRepository = companyRepository;
const productRepository = AppDataSource.getRepository(product_1.Product);
exports.productRepository = productRepository;
exports.default = AppDataSource;
