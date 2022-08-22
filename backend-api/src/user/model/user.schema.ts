import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

export enum Role {
	User = "user",
	Admin = "admin",
}

@Schema()
export class User {

	@Prop({ required: true })
	fullname: string;

	@Prop({ required: true, unique: true })
	phoneNumber: string;
	
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ type: String, enum: Role, default: Role.User })
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User);