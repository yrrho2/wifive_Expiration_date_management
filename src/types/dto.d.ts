export interface expiration_date_management {
    Code: string;
    AppName: string;
    UserName: string;
    ExpirationDate: Date;
    registDate: Date;
    type: Number;
}

export interface verify_response_body {
    result: boolean;
    code: Number;
    date: Date;
}
export interface verify_request_body {
    AppName: string;
    Code: string;
}