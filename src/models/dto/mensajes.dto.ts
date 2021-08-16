export class mensajeDTO {
    email: string;
    timestamp: Date;
    message: string;

    constructor(email: string, time: Date, message: string){
        this.email = email;
        this.timestamp = time;
        this.message = message;
    }
}