import { Injectable } from '@nestjs/common';
import { RegisterUserEvent, LoginUserEvent } from './event';

@Injectable()
export class AppService {

  handleUserCreated(data: RegisterUserEvent){
    console.log("[ Logger-Service ] : COMMUNICATION_USER_CREATED : ", data);
  }

  handleUserLoggedIn(data: LoginUserEvent){
    console.log("[ Logger-Service ] : COMMUNICATION_USER_Logged_In : ", data);
  }

  handleUserLoggedInMoleculer(data){
    console.log("[ Logger-Service ] : COMMUNICATION_USER_Logged_In_Moleculerjs : ", data);
  }

  handleUserTokenVerified(data){
    console.log("[ Logger-Service ] : COMMUNICATION_USER_Verification_In_Moleculerjs : ", data);
  }
}
