export interface User{
    id : string;
    fullName : string;
    email : string;
    password : string;
    confirmPassword? : string;
    roles: any[];
}

export interface userloggin{
    email : string;
    password : string;
}