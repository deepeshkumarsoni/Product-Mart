export interface User{
    fullName : string;
    email : string;
    password : string;
    confirmPassword? : string;
}

export interface userloggin{
    email : string;
    password : string;
}