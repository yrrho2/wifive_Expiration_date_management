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
exports.default = connectToDatabase;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'edm',
    keepAliveInitialDelay: Number(process.env.DB_KEEP_ALIVE_INITIAL_DELAY) || 10000,
    enableKeepAlive: process.env.DB_ENABLE_KEEP_ALIVE === 'true',
};
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!global.db) {
                global.db = yield promise_1.default.createPool(dbConfig);
            }
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    });
}
/**
 * 데이터베이스 연결 설정을 관리하는 파일
 * MySQL 데이터베이스 연결 설정 및 전역 연결 객체 관리
 *
 * 주요 기능:
 * - 데이터베이스 연결 설정
 * - 전역 연결 객체 관리
 * - 연결 에러 처리
 */
