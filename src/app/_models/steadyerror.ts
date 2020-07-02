export class SteadyError {
    errorMessage: string;
    invalidParams: InvalidParam[];
}

export class InvalidParam {
    object: string;
    field: string;
    rejectedValue: string;
    message: string;
}
