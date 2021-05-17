export class userDTO {
    email: string;
    password: string;
    name: string;
    lastName: string;

    constructor(email: string, password: string, name: string, lastName: string){
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
    }
}