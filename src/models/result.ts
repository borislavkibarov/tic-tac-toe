export class Result {

    private message: string;
    private isFinished: boolean;

    constructor(message: string, isFinished: boolean) {
        this.message = message;
        this.isFinished = isFinished;
    }

    getMessage(): string {
        return this.message;
    }

    getIsFinished(): boolean {
        return this.isFinished;
    }
}
