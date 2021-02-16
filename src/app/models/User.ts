export class User {
    email: string;
    constructor(data: any) {
        this.email = data.user?.email?? '';
    }
 }