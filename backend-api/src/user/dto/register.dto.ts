import { IsEmail, IsNotEmpty, IsString, Length, IsNumberString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(11, 11)
    @IsNumberString()
    phoneNumber: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
    
}