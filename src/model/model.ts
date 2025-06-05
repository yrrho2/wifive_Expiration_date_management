import { expiration_date_management } from "../types/dto";

export const verify_expiration_code = async(code: String) : Promise<expiration_date_management[]> => {
    // 여기서 판단할땐 앞서 예외처리를 다 한 상태
    try{
        // console.log("model code : "+ code)
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

export const create_expiration_code = async(expiration_date_management: expiration_date_management)=>{
    try{
        

        const sql = `INSERT INTO expiration_date_management (
                Code,
                AppName,
                UserName,
                ExpirationDate,
                registDate,
                type
            ) VALUES (
                '${expiration_date_management.Code}',
                '${expiration_date_management.AppName}',
                '${expiration_date_management.UserName}',
                '${expiration_date_management.ExpirationDate}',
                '${expiration_date_management.registDate}',
                ${expiration_date_management.type}
            );
        `;
        const [rows] = await db.execute(sql);
        return true;
    }catch (error){
        if(error instanceof Error) {
            console.log(`[${error.name}]: ${error.message}`);
        }
        return false;
    }
}


export const update_expiration_code = async(expiration_date_management: expiration_date_management)=>{
    try{
        const sql = `
        UPDATE expiration_date_management
        SET
            AppName = '${expiration_date_management.AppName}',
            UserName = '${expiration_date_management.UserName}',
            ExpirationDate = '${expiration_date_management.ExpirationDate}',
            
            type = ${expiration_date_management.type}
        WHERE
            Code = "${expiration_date_management.Code}";
        `;
        const [rows] = await db.execute(sql);
        return true;
    }catch (error){
        if(error instanceof Error) {
            console.log(`[${error.name}]: ${error.message}`);
        }
        return false;
    }
}



export const delete_expiration_code = async(code: String)=>{
    try{
        const sql = `
        DELETE FROM expiration_date_management
        WHERE
            Code = "${code}";
        `;
        const [rows] = await db.execute(sql);
        return true;
    }catch (error){
        if(error instanceof Error) {
            console.log(`[${error.name}]: ${error.message}`);
        }
        return false;
    }
}