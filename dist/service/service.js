"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.verify_expiration_code = void 0;
const model = __importStar(require("../model/model"));
const verify_expiration_code = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const code = requestBody.Code;
        const appName = requestBody.AppName;
        console.log(`검증 요청 - Code: ${code}, AppName: ${appName}`);
        const expiration_date_management = yield model.verify_expiration_code(code);
        console.log(`DB 조회 결과:`, JSON.stringify(expiration_date_management, null, 2));
        if (expiration_date_management.length > 0) {
            const expirationDate = new Date(expiration_date_management[0].ExpirationDate);
            const dbAppName = expiration_date_management[0].AppName;
            const now = new Date();
            // 날짜를 YYYY-MM-DD 형식으로 변환하여 비교
            // const nowStr = now.toString().split('T')[0];
            // const expirationStr =  expirationDate.toString().split('T')[0];
            console.log(`만료일: ${expirationDate}, 현재: ${now}, DB 앱이름: ${dbAppName}, 요청 앱이름: ${appName}`);
            console.log("만료되었는가? " + (expirationDate > now));
            const isVerified = expirationDate > now && dbAppName === appName;
            return {
                result: isVerified,
                code: isVerified ? 0 : 2,
                date: expirationDate
            };
        }
        else {
            console.log('코드에 해당하는 데이터가 없습니다.');
            return {
                result: false,
                code: 3,
                date: new Date()
            };
        }
    }
    catch (error) {
        console.error('Error in verify_expiration_code:', error);
        return {
            result: false,
            code: 6,
            date: new Date()
        };
    }
});
exports.verify_expiration_code = verify_expiration_code;
