import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { natsConfig } from './nats/nats.config';
import { User, UserSchema } from './user/model/user.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';


@Module({
  imports: [
    ConfigModule,
    HttpModule,
    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      ...natsConfig,
    }]),

    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      }),
      envFilePath: [ '.env' ]
    }),
    
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [ UserController, ProductController ],
  providers: [ UserService, ProductService ],
})
export class AppModule {}
