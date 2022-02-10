import NetworkError from "./NetworkError";

class TasksServiceError extends NetworkError {
    constructor(message: string = "", statusCode: number = 500) {
        super(message, statusCode);

        this.name = this.constructor.name;
    }
}

export default TasksServiceError;
