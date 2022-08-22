import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../user/model/user.schema";
import { HttpService } from '@nestjs/axios';
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class CustomGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
        private readonly httpService: HttpService
    ) {}

    canActivate(context: ExecutionContext): boolean |Promise<boolean> |Observable<boolean>{
        const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();
        var token = request.header('x-access-token');
        const role = requireRoles
        const verificationResult = this.verify(role, token);
        return verificationResult;
    }

  async verify(role, token) {
    const data = {
      role,
      token
    }
    const result = await this.httpService.axiosRef.post('http://localhost:3000/api/authorization/verifyToken', data);
    this.client.emit('user_verified' , {user: result.data.payload, message: result.data.message});
    if(result.data.message === 'Authentication failed') {
        return false;
    }else if(result.data.message === 'Authenticated') {
        return true;
    }
  }
}