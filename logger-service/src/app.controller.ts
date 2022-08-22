import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

import { RegisterUserEvent, LoginUserEvent } from './event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('user_registered')
  handleUserCreated(data: RegisterUserEvent){
    this.appService.handleUserCreated(data);
  }

  @EventPattern('user_logged_in')
  handleUserLoggedIn(data: LoginUserEvent){
    this.appService.handleUserLoggedIn(data);
  }

  @EventPattern('user_logged_in_moleculerjs')
  handleUserLoggedInMoleculer(data){
    this.appService.handleUserLoggedInMoleculer(data);
  }

  @EventPattern('user_verified')
  handleUserTokenVerified(data){
    this.appService.handleUserTokenVerified(data);
  }

}
