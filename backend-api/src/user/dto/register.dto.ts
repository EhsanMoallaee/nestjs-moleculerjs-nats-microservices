import { IsEmail, IsNotEmpty, IsString, Length, IsNumberString } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsNotEmpty()
    @Length(11, 11)
    @IsNumberString()
    phoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}