import { TIMEOUT } from "dns";
import * as model from "../model/model";
import { expiration_date_management, verify_response_body, verify_request_body } from "../types/dto";
import { Request, Response } from 'express';

export const verify_expiration_code = async(req: Request, res: Response): Promise<verify_response_body> => {
    try {
        const requestBody = req.body as verify_request_body;
        // 기초 예외처리
        if(requestBody.AppName== undefined){
            return {
                result: false,
                code: 5,
                date: new Date()
            }
        }else if(requestBody.Code == undefined){
            return {
                result: false,
                code: 4,
                date: new Date()
            }
        }


        const code = requestBody.Code;
        const appName = requestBody.AppName;

        console.log(`검증 요청 - Code: ${code}, AppName: ${appName}`);

        // 데이터베이스에서 code로 데이터 읽어오기
        const expiration_date_management = await model.verify_expiration_code(code);

        // 응답하는 body
        let verify_response_body : verify_response_body;


        // 1개도 없으면 Code : 2
        if (expiration_date_management.length > 0) {
            // Code 조회 데이터에서 값 가져오기
            const expirationDate = new Date(expiration_date_management[0].ExpirationDate);
            const dbAppName = expiration_date_management[0].AppName;
            const now = new Date();

            // 인증 실패. 기간 지남. 만료날짜 같이 반환
            if(expirationDate <= now){
                verify_response_body= {
                    result: false,
                    code: 1,
                    date: expirationDate
                };
            }
            // console.log("만료되었는가? " + (expirationDate > now));

            const isVerified = expirationDate > now && dbAppName === appName;
            
            // 인증 성공/실패. 판단 
            verify_response_body= {
                result: isVerified,
                code: isVerified ? 0 : 2,
                date: isVerified ? expirationDate : new Date()
            };
        } else {
            //
            console.log('코드에 해당하는 데이터가 없습니다.');
            verify_response_body=  {
                result: false,
                code: 2,
                date: new Date()
            };
        }

        return verify_response_body;
    } catch (error) {
        console.error('Error in verify_expiration_code:', error);
        if(error ==TIMEOUT){
            return {
                result: false,
                code: 3,
                date: new Date()
            };
        }else {
            return {
                result: false,
                code: 6,
                date: new Date()
            };
        }
    }
}

// 새로운 CRUD 서비스 함수들
export const create_expiration_code = async(req: Request, res: Response): Promise<boolean> => {
    try {
        const requestBody = req.body as expiration_date_management;
        
        // 필수 필드 검증
        if (!requestBody.Code || !requestBody.AppName || !requestBody.ExpirationDate) {
            console.log("필수 필드 누락");
            return false;
        }
        // 현재 날짜를 registDate로 설정
    
        requestBody.registDate = new Date();
        console.log("새 몸 : "+requestBody.registDate)
        // type이 없으면 기본값 0으로 설정
        if (requestBody.type === undefined) {
            requestBody.type = 1;
        }

        console.log(`생성 요청 - Code: ${requestBody.Code}, AppName: ${requestBody.AppName}`);
        return await model.create_expiration_code(requestBody);
    } catch (error) {
        console.error('Error in create_expiration_code:', error);
        return false;
    }
}

export const update_expiration_code = async(req: Request, res: Response): Promise<boolean> => {
    try {
        const requestBody : expiration_date_management = req.body as expiration_date_management;
        
        // 필수 필드 검증
        if (!requestBody.Code) {
            console.log("Code 필드 누락");
            return false;
        }

        console.log(`수정 요청 - Code: ${requestBody.Code}`);
        
        // 기존 데이터 확인
        const existingData = await model.select_expiration_code(requestBody.Code);
        if (existingData.length === 0) {
            console.log("수정할 데이터가 없습니다.");
            return false;
        }

        return await model.update_expiration_code(requestBody);
    } catch (error) {
        console.error('Error in update_expiration_code:', error);
        return false;
    }
}

export const delete_expiration_code = async(req: Request, res: Response): Promise<boolean> => {
    try {
        const requestBody = req.body as expiration_date_management;
        
        // 필수 필드 검증
        if (!requestBody.Code) {
            console.log("Code 필드 누락");
            return false;
        }

        // 기존 데이터 확인
        const existingData = await model.select_expiration_code(requestBody.Code);
        if (existingData.length === 0) {
            console.log("삭제할 데이터가 없습니다.");
            // 없긴해도 성공으로 보냄
            return true;
        }

        console.log(`삭제 요청 - Code: ${requestBody.Code}`);
        return await model.delete_expiration_code(requestBody.Code);
    } catch (error) {
        console.error('Error in delete_expiration_code:', error);
        return false;
    }
}

