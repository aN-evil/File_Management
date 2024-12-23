export enum ApiDescription {
    SUCCESS = 'Operation was successful.',
    CREATED = 'The operation was successfully completed.',
    BAD_REQUEST = 'Invalid input. Please check your request.',
    NOT_FOUND = 'The requested item was not found.',
    UNAUTHORIZED = 'You are not authorized to perform this action.',
    SERVER_ERROR = 'There was a problem with the server. Please try again later.',
}

export enum ApiThrowError {
    INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password',
    EMAIL_ALREADY_TAKEN = 'Email is already taken.',
    USERNAME_ALREADY_TAKEN = 'Username is already taken.',
    INVALID_PASSWORD = 'Invalid Password',
    USER_NOT_FOUND = 'User is not found',
    SOMETHING_WENT_WRONG = 'Something went wrong',
    ORGANIZATION_CREATION_FAILED = 'Organization creation failed',
    USER_UPDATE_FAILED = 'Error while updating user',
    REFRESH_TOKEN_NULL = 'Refresh token is null',
    INVALID_REFRESH_TOKEN = 'Invalid refresh token',
    INVALID_TOKEN = 'Invalid token',
    TOKEN_HAS_EXPIRED = 'Token has expired',
    JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError',
    TOKEN_EXPIRED_ERROR = 'TokenExpiredError',
    TOKEN_REFRESH = 'Token refreshed successfully!',
    ADMIN_NOT_FOUND='Admin not found, kindly register.',
    JWT='JWT secret is not defined in the environment.',
    INVALID_EMAIL = 'Invalid email address provided.',
    INVALID_OTP = 'The provided OTP is invalid.',
    OTP_NOT_FOUND = 'OTP is not found.',
    FAILED_TO_SEND_OTP = 'Failed to send OTP email.',
    ERROR_IN_VERIFYING_OTP = 'Error in verifying OTP.',

}
