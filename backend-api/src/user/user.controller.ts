import { Body, Controller, Get, HttpCode, Post, HttpStatus, Response, Headers, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response as Res } from 'express';
import { CustomGuard } from '../customGuard/auth.guard';
import { RegisterDto, LoginDto } from './dto';
import { UserService } from './user.service';

@ApiTags('users')
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

  // Just for own tests
  @ApiHeader({
    name: 'x-access-token',
    description: 'Auth token',
  })
  @Post('verify')
  async verify(
    @Body() userData,
    @Response() res: Res,
    @Headers('x-access-token') token    
  ) { 
    const result = await this.userService.verify(userData, token);
    return res.set({ 'x-access-token': result.token }).json(result.message);
  }

  // Just for own tests
  @Post('verifyguard')
  @SetMetadata('roles','admin')
  @UseGuards(CustomGuard)
  verifyg(   
  ) { 
    return {message: 'hi g'};
  }

}