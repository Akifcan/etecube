"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRepository = exports.userRepository = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const typeorm_1 = require("typeorm");
const company_1 = require("./entity/company");
const user_1 = require("./entity/user");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [user_1.User, company_1.Company],
    synchronize: true,
    logging: false,
});
const userRepository = AppDataSource.getRepository(user_1.User);
exports.userRepository = userRepository;
const companyRepository = AppDataSource.getRepository(company_1.Company);
exports.companyRepository = companyRepository;
exports.default = AppDataSource;
