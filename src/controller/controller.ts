import { Express, Request, Response, RequestHandler } from 'express';
import * as service from "../service/service";

export function controller(app: Express) {
    // 기본 라우트
    app.get('/', ((req: Request, res: Response) => {
        console.log("index 요청 /");
        res.send('Hello, TypeScript + Express!');
    }) as RequestHandler);

    // 인증 코드 검증
    app.post('/api/code/verify', ((req: Request, res: Response) => {
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
    }) as RequestHandler);

    // 코드 생성
    app.post('/api/code/create', ((req: Request, res: Response) => {
        service.create_expiration_code(req, res)
            .then(success => {
                if (success) {
                    res.status(201).json({
                        result: true,
                        message: "코드가 성공적으로 생성되었습니다."
                    });
                } else {
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
    }) as RequestHandler);

    // 코드 수정
    app.put('/api/code/update', ((req: Request, res: Response) => {
        service.update_expiration_code(req, res)
            .then(success => {
                if (success) {
                    res.status(200).json({
                        result: true,
                        message: "코드가 성공적으로 수정되었습니다."
                    });
                } else {
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
    }) as RequestHandler);

    // 코드 삭제
    app.delete('/api/code/delete', ((req: Request, res: Response) => {
        service.delete_expiration_code(req, res)
            .then(success => {
                if (success) {
                    res.status(200).json({
                        result: true,
                        message: "코드가 성공적으로 삭제되었습니다."
                    });
                } else {
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
    }) as RequestHandler);
}
