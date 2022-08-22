export class LoginUserEvent {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly fullname: string,
    ){}
}