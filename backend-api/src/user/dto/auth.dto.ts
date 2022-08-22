import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongodb"
import { Type } from "class-transformer"
import { UsePipes, ValidationPipe } from "@nestjs/common";

@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthDto {
    
    @IsNotEmpty()
    @Type(() => ObjectId)
    _id: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}