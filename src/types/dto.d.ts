export interface expiration_date_management {
    Code: number;
    AppName: string;
    address: string;
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
    AppName: String;
    Code: String;
}