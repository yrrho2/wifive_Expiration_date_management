import { expiration_date_management } from "../types/dto";

export const verify_expiration_code = async(code: String) : Promise<expiration_date_management[]> => {
    // 여기서 판단할땐 앞서 예외처리를 다 한 상태
    try{
        console.log("model code : "+ code)
        const sql = `SELECT * FROM expiration_date_management as edm WHERE edm.Code = "${code}"`;
        const [rows] = await db.execute(sql);
        return rows as expiration_date_management[];
    }catch (error){
        if(error instanceof Error) {
            console.log(`[${error.name}]: ${error.message}`);
        }
    }
    return [];
}

// 해당 코드로 인증서 검색 (아마 하나만 나올듯)
export const select_expiration_code = async(code: String) : Promise<expiration_date_management[]> => {
    // 여기서 판단할땐 앞서 예외처리를 다 한 상태
    try{
        const sql = "SELECT * FROM expiration_date_management as edm WHERE edm.Code = ?";
        const [rows] = await db.execute(sql, [code]);
        return rows as expiration_date_management[];
    }catch (error){
        if(error instanceof Error) {
            console.log(`[${error.name}]: ${error.message}`);
        }
    }
    return [];
}