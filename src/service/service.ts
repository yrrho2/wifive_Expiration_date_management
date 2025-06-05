import * as model from "../model/model";
import { expiration_date_management, verify_response_body, verify_request_body } from "../types/dto";
import { Request, Response } from 'express';

export const verify_expiration_code = async(req: Request, res: Response): Promise<verify_response_body> => {
    try {
        const requestBody = req.body as verify_request_body;
        const code = requestBody.Code;
        const appName = requestBody.AppName;

        console.log(`검증 요청 - Code: ${code}, AppName: ${appName}`);

        const expiration_date_management = await model.verify_expiration_code(code);
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
        } else {
            console.log('코드에 해당하는 데이터가 없습니다.');
            return {
                result: false,
                code: 3,
                date: new Date()
            };
        }
    } catch (error) {
        console.error('Error in verify_expiration_code:', error);
        return {
            result: false,
            code: 6,
            date: new Date()
        };
    }
}

