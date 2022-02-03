class NetworkError extends Error {
    statusCode: number;

    constructor(message: string = "", statusCode: number = 500) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

export default NetworkError;
