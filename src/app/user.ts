export interface User{
    fullName : string;
    email : string;
    password : string;
    repeatPassword? : string;
}

export interface loggin{
    userId : string;
    password : string;
}