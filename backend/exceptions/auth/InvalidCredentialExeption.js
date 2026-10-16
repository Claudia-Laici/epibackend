import HttpException from "../index"

class InvalidCredentialExceptions extends HttpException {
    constructor(
        message = 'Invalid email or password',
        statusCode = 401,
        error = "The credentials are not correct"
    ) {
        super(message, statusCode, error)
    }
}

export default InvalidCredentialExceptions