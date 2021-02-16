export class User {
    email: string;
    uid: string;
    constructor(data: any) {
        console.log(data);
        this.email = data.user?.email?? '';
        this.uid = data.user?.uid?? '';
    }
 }