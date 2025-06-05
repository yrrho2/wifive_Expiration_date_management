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
Object.defineProperty(exports, "__esModule", { value: true });
exports.select_expiration_code = exports.verify_expiration_code = void 0;
const verify_expiration_code = (code) => __awaiter(void 0, void 0, void 0, function* () {
    // 여기서 판단할땐 앞서 예외처리를 다 한 상태
    try {
        console.log("model code : " + code);
        const sql = `SELECT * FROM expiration_date_management as edm WHERE edm.Code = "${code}"`;
        const [rows] = yield db.execute(sql);
        return rows;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`[${error.name}]: ${error.message}`);
        }
    }
    return [];
});
exports.verify_expiration_code = verify_expiration_code;
// 해당 코드로 인증서 검색 (아마 하나만 나올듯)
const select_expiration_code = (code) => __awaiter(void 0, void 0, void 0, function* () {
    // 여기서 판단할땐 앞서 예외처리를 다 한 상태
    try {
        const sql = "SELECT * FROM expiration_date_management as edm WHERE edm.Code = ?";
        const [rows] = yield db.execute(sql, [code]);
        return rows;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`[${error.name}]: ${error.message}`);
        }
    }
    return [];
});
exports.select_expiration_code = select_expiration_code;
