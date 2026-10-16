import HttpException from "../index"

class UserNotFoundException extends HttpException {
    constructor(
        message = 'User not found',
        statusCode = 404,
        error = "The requested user not exist"
    ) {
        super(message, statusCode, error)
    }
}

export default UserNotFoundException