import { Body, Controller, Get, HttpCode, Post, HttpStatus, Response, Headers, UseGuards, SetMetadata } from '@nestjs/common';
import { Response as Res } from 'express';
import { CustomGuard } from '../customGuard/auth.guard';
import { RegisterDto, LoginDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  registerUser(@Body() userData: RegisterDto) {
    return this.userService.registerUser(userData);
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Response() res: Res
  ) {
    const result = await this.userService.login(dto);
    return res.set({ 'x-access-token': result.token }).json(result.fullname);
  }

  @Post('verify')
  async verify(
    @Body() userData,
    @Response() res: Res,
    @Headers('x-access-token') token    
  ) { 
    const result = await this.userService.verify(userData, token);
    return res.set({ 'x-access-token': result.token }).json(result.message);
  }

  @Post('verifyguard')
  @SetMetadata('roles','admin')
  @UseGuards(CustomGuard)
  verifyg(   
  ) { 
    return {message: 'hi g'};
  }



}