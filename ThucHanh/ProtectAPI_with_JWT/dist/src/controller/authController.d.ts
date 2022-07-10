export default class AuthController {
    static login(req: any, res: any): void;
    static postLogin(req: any, res: any, next: any): Promise<void>;
    static register(req: any, res: any): void;
    static postRegister(req: any, res: any): Promise<void>;
}
