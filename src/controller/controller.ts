import { Express, Request, Response } from 'express';
import * as service from "../service/service";

export function controller(app: Express) {
    // 기본 라우트
    app.get('/', (req: Request, res: Response) => {
        console.log("index 요청 /");
        res.send('Hello, TypeScript + Express!');
    });
    // 인증 코드 검증
    app.post('/api/code/verify', (req: Request, res: Response) => {
        console.log("POST /api/code/verify 요청 받음");
        
        
        if (!req.body || !req.body.Code || !req.body.AppName) {
            console.log("잘못된 요청 형식");
            return res.status(400).json({
                result: false,
                code: 1,
                date: new Date(),
                message: "잘못된 요청 형식입니다. Code와 AppName이 필요합니다."
            });
        }

        service.verify_expiration_code(req, res)
            .then(responseBody => {
                console.log("Response body:", JSON.stringify(responseBody, null, 2));
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
    });

    // 나머지 라우트들
    app.put('/api/code/update', (req: Request, res: Response) => {
        res.send('Hello, TypeScript + Express!');
    });

    app.delete('/api/code/delete', (req: Request, res: Response) => {
        res.send('Hello, TypeScript + Express!');
    });

    app.post('/api/code/create', (req: Request, res: Response) => {
        res.send('Hello, TypeScript + Express!');
    });
}
