import * as argon from 'argon2';
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto, LoginDto, AuthDto } from './dto';
import { User, UserDocument } from './model/user.schema';
import { RegisterUserEvent, LoginUserEvent } from './event';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
    private readonly httpService: HttpService
  ) {}

  async registerUser(userData: RegisterDto) {
    userData.password = await argon.hash(userData.password);
    const user = new this.userModel(userData);
    await user.save().then(
        user => {
            return user;
        }
    ).catch(err => {
        console.log(err.code)
        if(err.code == 11000) {
            console.log(err.message.split("key:")[1])
            const errMessage = err.message.split("key:")[1];
            throw new HttpException(`Duplicate : ${errMessage}`, HttpStatus.CONFLICT)
        }
    });

    const createdUser = {
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      email: user.email,
    }
    this.client.emit('user_registered' , new RegisterUserEvent(createdUser.email));
    return createdUser;

  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({email: dto.email}).lean();

    if(!user) throw new ForbiddenException('مشخصات وارد شده صحیح نمیباشد');
    const pwMatch = await argon.verify(user.password, dto.password);
    if(!pwMatch) throw new ForbiddenException('مشخصات وارد شده صحیح نمیباشد');

    this.client.emit('user_logged_in' , new LoginUserEvent(user._id, user.email, user.fullname));

    const authData: AuthDto = {_id: user._id, email: user.email, fullname: user.fullname, role: user.role};
    const result = await this.httpService.axiosRef.post('http://localhost:3000/api/auth/login', authData);
    
    const data = {
      token: result.data,
      fullname: user.fullname,
    }
    return data;
  }

  async verify(userData, token) {
    const data = {
      role: 'admin',
      token
    }
    const result = await this.httpService.axiosRef.post('http://localhost:3000/api/authorization/verifyToken', data);
    this.client.emit('user_verified' , {user: result.data.payload, message: result.data.message});
    return result.data
  }
}
