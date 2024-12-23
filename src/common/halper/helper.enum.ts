export enum ApiError {
    // User-related errors
    USER_INVALID_EMAIL_OR_PASSWORD = 'Incorrect email or password, please try again.',
    USER_EMAIL_ALREADY_TAKEN = 'This email is already registered. Try logging in.',
    USER_USERNAME_ALREADY_TAKEN = 'This username is already in use. Please choose another one.',
    USER_NOT_FOUND = 'No user found with the provided details.',
    USER_UPDATE_FAILED = 'We encountered an issue while updating your profile.',
    USER_NO_DATA_FOUND = 'No user data found. Please check your details.',
    USER_INVALID_EMAIL = 'The email address you entered is incorrect. Please try again.',
    USER_INVALID_PASSWORD = 'The password you entered is incorrect. Please try again.',
    USER_INVALID_OLD_PASSWORD = 'The old password you entered is incorrect.',
    USER_PASSWORD_NOT_CHANGED = 'Your password could not be changed. Please try again.',
    USER_PASSWORD_CHANGED_SUCCESS = 'Your password has been successfully updated.',
    USER_LOGIN_SUCCESS = 'You have successfully logged in!',
    USER_SIGNUP_SUCCESS = 'Signup was successful! Welcome aboard.',
    USER_DELETE_SUCCESS = 'Your account has been successfully deleted.',
    USER_IMAGES_INCORRECT_FORMAT = 'User images are not in the correct format.',
    USER_ALREADY_FOLLOWING = 'Already following this user.',
    USER_FOLLOW_NOTIFICATION = 'Just followed you!',
    USER_NEW_FOLLOWER_NOTIFICATION = 'You have a new follower!',
    USER_NOT_BEING_FOLLOWED = 'User is not being followed.',
    USER_UNFOLLOW_SUCCESSFUL = 'Unfollow successful.',
    USER_REMOVE_SUCCESSFUL = 'Remove successful.',
    USER_WATCH_ID_REQUIRED = 'User watch ID is required for user watch recipes.',
    USER_NO_INTERESTS_FOUND = 'No interests found for the specified User_id.',

    // Email-related errors
    EMAIL_SENT_SUCCESS = 'Email sent successfully!',
    EMAIL_CONFIGURATION_ERROR = 'There seems to be an issue with the email configuration.',
    EMAIL_SEND_FAILED = 'Unable to send the email. Please try again later.',
    EMAILS_NOT_FOUND = 'No emails available.',
    EMAIL_GENERATION_FAILED = 'Failed to generate emails for some users.',
    EMAIL_ALREADY_EXISTS = 'Email already exists.',

    // OTP-related errors
    OTP_INVALID = 'The OTP you entered is invalid. Please try again.',
    OTP_SEND_FAILED = 'We couldn’t send the OTP. Please try again.',
    OTP_VERIFICATION_FAILED = 'Failed to verify the OTP. Please check and try again.',
    OTP_NOT_FOUND = 'The OTP does not exist or has expired.',
    OTP_SENT_SUCCESS = 'OTP has been sent successfully!',
    OTP_EXPIRED = 'This OTP has expired. Please request a new one.',
    OTP_VERIFIED_SUCCESS = 'OTP verified successfully!',
    OTP_VERIFICATION_TITLE = 'OTP Verification',
    OTP_MESSAGE_PREFIX = 'Your OTP code is',

    // Admin-related errors
    ADMIN_NOT_FOUND = 'Admin not found. Please register to proceed.',
    ADMIN_NOT_ALLOWED = 'You are not allowed to perform this action.',

    // Token-related errors
    TOKEN_REFRESH_NULL = 'No refresh token provided.',
    TOKEN_INVALID_REFRESH = 'The refresh token provided is invalid.',
    TOKEN_INVALID = 'Invalid token. Please log in again.',
    TOKEN_EXPIRED = 'Your session has expired. Please log in again.',
    TOKEN_JWT_ERROR = 'There was an error with token validation.',
    TOKEN_EXPIRED_ERROR = 'Your token has expired.',
    TOKEN_REFRESH_SUCCESS = 'Token refreshed successfully!',
    TOKEN_JWT_SECRET_UNDEFINED = 'JWT secret is not set in the environment variables.',

    // General errors
    GENERAL_GENERIC_ERROR = 'An unexpected error occurred. Please try again.',
    GENERAL_ID_NOT_FOUND = 'The requested resource could not be found.',
    GENERAL_UPDATE_SUCCESS = 'Update completed successfully!',
    GENERAL_DELETE_SUCCESS = 'Deleted successfully!',
    GENERAL_NAME_ALREADY_EXISTS = 'This name is already in use. Please choose another.',
    GENERAL_TITLE_ALREADY_EXISTS = 'This title is already in use.',
    GENERAL_OPERATION_SUCCESS = 'Operation completed successfully!',
    GENERAL_ADDITION_FAILED = 'Failed to add the item.',
    GENERAL_DELETION_FAILED = 'Failed to delete the item.',
    GENERAL_UPDATE_FAILED = 'Update failed. Please try again.',
    GENERAL_LIST_FAILED = 'Unable to retrieve the list.',
    GENERAL_UNAUTHORIZED_ACCESS = "You don't have permission to access this resource.",

    // Notification topic subscription
    NOTIFICATION_ALL_USERS_FIREBASE_TOPIC = 'Subscribed to all-users topic for notifications.',

    // Device-related errors
    DEVICE_NO_DEVICE_FOUND_FOR_USER = 'No devices found for the user.',
    DEVICE_NOT_EXIST = 'This device does not exist.',
    DEVICE_NOT_FOUND_BY_AUTH_TOKEN = 'Device with the provided auth token and blueprint ID not found.',
    DEVICE_ALREADY_IN_USE = 'This device is already linked to another user.',
    DEVICE_BINDING_NOT_FOUND = 'No binding found between this user and device.',
    DEVICE_UNBOUND_SUCCESS = 'Device successfully unbound.',
    DEVICE_NOT_FOUND_BY_ID = 'No device found with the provided ID.',

    // File-related errors
    FILE_SAVE_FAILED = 'Failed to save the file.',
    FILE_UPLOAD_SFTP_FAILED = 'Error uploading file via SFTP.',
    FILE_MULTIPLE_UPLOAD_SFTP_FAILED = 'Error uploading multiple files via SFTP.',
    FILE_VIDEO_UPLOAD_FAILED = 'Video upload failed.',

    // Fitness goal-related errors
    FITNESS_GOALS_NOT_FOUND = 'One or more fitness goals were not found.',

    // FCM token-related errors
    FCM_TOKEN_UPDATED_SUCCESS = 'Your FCM token has been updated successfully.',

    // Search-related errors
    SEARCH_INVALID_CHARACTERS = 'Search query cannot contain special characters.',

    // Recipe-related errors
    RECIPE_NOT_EXIST = 'Recipe does not exist.',

    // Watch history-related errors
    WATCH_HISTORY_NOT_FOUND = 'Watch history entry not found.',

    // Type-related errors
    TYPE_INVALID = 'Invalid type. Please provide a valid type: 1, 2, or 3.',

    // Creation-related errors
    CREATION_SUCCESSFUL = 'Created successfully.',
    USER_NOT_REGISTER = 'The email address you entered is not registered. Please try again.',
}

export enum ApiDescription {
    SUCCESS = 'Operation was successful.',
    CREATED = 'The operation was successfully completed.',
    BAD_REQUEST = 'Invalid input. Please check your request.',
    NOT_FOUND = 'The requested item was not found.',
    UNAUTHORIZED = 'You are not authorized to perform this action.',
    SERVER_ERROR = 'There was a problem with the server. Please try again later.',
}
