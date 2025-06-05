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
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = controller;
const service = __importStar(require("../service/service"));
function controller(app) {
    // 기본 라우트
    app.get('/', ((req, res) => {
        console.log("index 요청 /");
        res.send('Hello, TypeScript + Express!');
    }));
    // 인증 코드 검증
    app.post('/api/code/verify', ((req, res) => {
        if (!req.body || !req.body.Code || !req.body.AppName) {
            console.log("잘못된 요청 형식");
            return res.status(400).json({
                result: false,
                code: 4,
                date: new Date(0)
            });
        }
        service.verify_expiration_code(req, res)
            .then(responseBody => {
            return res.status(200).json(responseBody);
        })
            .catch(error => {
            console.error('Error in verify endpoint:', error);
            return res.status(500).json({
                result: false,
                code: 6,
                date: new Date(),
                message: "서버 내부 오류가 발생했습니다."
            });
        });
    }));
    // 코드 생성
    app.post('/api/code/create', ((req, res) => {
        service.create_expiration_code(req, res)
            .then(success => {
            if (success) {
                res.status(201).json({
                    result: true,
                    message: "코드가 성공적으로 생성되었습니다."
                });
            }
            else {
                res.status(400).json({
                    result: false,
                    message: "코드 생성에 실패했습니다."
                });
            }
        })
            .catch(error => {
            console.error('Error in create endpoint:', error);
            res.status(500).json({
                result: false,
                message: "서버 내부 오류가 발생했습니다."
            });
        });
    }));
    // 코드 수정
    app.put('/api/code/update', ((req, res) => {
        service.update_expiration_code(req, res)
            .then(success => {
            if (success) {
                res.status(200).json({
                    result: true,
                    message: "코드가 성공적으로 수정되었습니다."
                });
            }
            else {
                res.status(400).json({
                    result: false,
                    message: "코드 수정에 실패했습니다."
                });
            }
        })
            .catch(error => {
            console.error('Error in update endpoint:', error);
            res.status(500).json({
                result: false,
                message: "서버 내부 오류가 발생했습니다."
            });
        });
    }));
    // 코드 삭제
    app.delete('/api/code/delete', ((req, res) => {
        service.delete_expiration_code(req, res)
            .then(success => {
            if (success) {
                res.status(200).json({
                    result: true,
                    message: "코드가 성공적으로 삭제되었습니다."
                });
            }
            else {
                res.status(400).json({
                    result: false,
                    message: "코드 삭제에 실패했습니다."
                });
            }
        })
            .catch(error => {
            console.error('Error in delete endpoint:', error);
            res.status(500).json({
                result: false,
                message: "서버 내부 오류가 발생했습니다."
            });
        });
    }));
}
