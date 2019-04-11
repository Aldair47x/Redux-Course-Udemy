

export class User {
    public email: string;
    public name: string;
    // public password: string;
    public uid: string;

    constructor(email: string, name: string, uid: string) {

        this.email = email;
        this.name = name;
        // this.password = password;
        this.uid = uid;
    }
}