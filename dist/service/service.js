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
exports.delete_expiration_code = exports.update_expiration_code = exports.create_expiration_code = exports.verify_expiration_code = void 0;
const dns_1 = require("dns");
const model = __importStar(require("../model/model"));
const verify_expiration_code = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        // 기초 예외처리
        if (requestBody.AppName == undefined) {
            return {
                result: false,
                code: 5,
                date: new Date()
            };
        }
        else if (requestBody.Code == undefined) {
            return {
                result: false,
                code: 4,
                date: new Date()
            };
        }
        const code = requestBody.Code;
        const appName = requestBody.AppName;
        console.log(new Date().toISOString() + `검증 요청 - Code: ${code}, AppName: ${appName}`);
        // 데이터베이스에서 code로 데이터 읽어오기
        const expiration_date_management = yield model.verify_expiration_code(code);
        // 응답하는 body
        let verify_response_body;
        // 1개도 없으면 Code : 2
        if (expiration_date_management.length > 0) {
            // Code 조회 데이터에서 값 가져오기
            const expirationDate = new Date(expiration_date_management[0].ExpirationDate);
            const dbAppName = expiration_date_management[0].AppName;
            const now = new Date();
            // 인증 실패. 기간 지남. 만료날짜 같이 반환
            if (expirationDate <= now) {
                verify_response_body = {
                    result: false,
                    code: 1,
                    date: expirationDate
                };
            }
            // console.log("만료되었는가? " + (expirationDate > now));
            const isVerified = expirationDate > now && dbAppName === appName;
            // 인증 성공/실패. 판단 
            verify_response_body = {
                result: isVerified,
                code: isVerified ? 0 : 2,
                date: isVerified ? expirationDate : new Date()
            };
        }
        else {
            //
            console.log('코드에 해당하는 데이터가 없습니다.');
            verify_response_body = {
                result: false,
                code: 2,
                date: new Date()
            };
        }
        return verify_response_body;
    }
    catch (error) {
        console.error('Error in verify_expiration_code:', error);
        if (error == dns_1.TIMEOUT) {
            return {
                result: false,
                code: 3,
                date: new Date()
            };
        }
        else {
            return {
                result: false,
                code: 6,
                date: new Date()
            };
        }
    }
});
exports.verify_expiration_code = verify_expiration_code;
// 새로운 CRUD 서비스 함수들
const create_expiration_code = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        // 필수 필드 검증
        if (!requestBody.Code || !requestBody.AppName || !requestBody.ExpirationDate) {
            console.log("필수 필드 누락");
            return false;
        }
        // 현재 날짜를 registDate로 설정
        requestBody.registDate = new Date();
        console.log("새 몸 : " + requestBody.registDate);
        // type이 없으면 기본값 0으로 설정
        if (requestBody.type === undefined) {
            requestBody.type = 1;
        }
        console.log(`생성 요청 - Code: ${requestBody.Code}, AppName: ${requestBody.AppName}`);
        return yield model.create_expiration_code(requestBody);
    }
    catch (error) {
        console.error('Error in create_expiration_code:', error);
        return false;
    }
});
exports.create_expiration_code = create_expiration_code;
const update_expiration_code = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        // 필수 필드 검증
        if (!requestBody.Code) {
            console.log("Code 필드 누락");
            return false;
        }
        console.log(`수정 요청 - Code: ${requestBody.Code}`);
        // 기존 데이터 확인
        const existingData = yield model.select_expiration_code(requestBody.Code);
        if (existingData.length === 0) {
            console.log("수정할 데이터가 없습니다.");
            return false;
        }
        return yield model.update_expiration_code(requestBody);
    }
    catch (error) {
        console.error('Error in update_expiration_code:', error);
        return false;
    }
});
exports.update_expiration_code = update_expiration_code;
const delete_expiration_code = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        // 필수 필드 검증
        if (!requestBody.Code) {
            console.log("Code 필드 누락");
            return false;
        }
        // 기존 데이터 확인
        const existingData = yield model.select_expiration_code(requestBody.Code);
        if (existingData.length === 0) {
            console.log("삭제할 데이터가 없습니다.");
            // 없긴해도 성공으로 보냄
            return true;
        }
        console.log(`삭제 요청 - Code: ${requestBody.Code}`);
        return yield model.delete_expiration_code(requestBody.Code);
    }
    catch (error) {
        console.error('Error in delete_expiration_code:', error);
        return false;
    }
});
exports.delete_expiration_code = delete_expiration_code;
