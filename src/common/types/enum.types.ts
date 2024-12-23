export enum responseMessages {
    'INTERNAL_SERVER_ERROR' = 'Internal Server Error',
    'INVALID_CREDENTIALS' = 'Invalid Username or Password',
    'EMAIL_EXISTS' = 'Email already exists',
    'USERNAME_EXISTS' = 'Username already exists',
    'LOGIN_SUCCESS' = 'Login Successfully.',
    'REGISTRATION_SUCCESS' = 'Registration Successful',
}

export enum ErrorMessage {
    NAME_ALREADY_EXISTS = 'Name already exists',
    ID_NOT_FOUND = 'This ID is not found',
    FEEDBACK_NOT_FOUND = 'Feedback is not found',
    NOT_FOUND = 'Not found',
    USER_IMAGES_INCORRECT_FORMAT = 'User images not in the correct format',
    ALREADY_FOLLOWING_USER = 'Already following this user',
    USER_NOT_FOUND = 'User Not found',
    JUST_FOLLOWED_YOU = 'Just followed you!',
    NEW_FOLLOWER = 'You have a new follower!',
    USER_NOT_BEING_FOLLOWED = 'User is not being followed',
    UNFOLLOW_SUCCESSFUL = 'Unfollow successful',
    REMOVE_SUCCESSFUL = 'Remove successful',
    RECIPE_NOT_EXIST = 'Recipe does not exist',
    WATCH_HISTORY_ENTRY_NOT_FOUND = 'Watch history entry not found',
    INVALID_TYPE = 'Invalid type. Please provide a valid type: 1, 2, or 3.',
    USER_WATCH_ID_REQUIRED = 'User watch ID is required for user watch recipes',
    NO_INTERESTS_FOR_USER_ID = 'No interests found for the specified User_id',
    INVALID_EMAIL = 'Invalid email',
    PASSWORD_NOT_CHANGED = 'Password is not changed',
    PASSWORD_CHANGED = 'Password is changed',
    USERNAME_ALREADY_EXISTS = 'Username already exists',
    MORE_IDS_DO_NOT_EXIST = 'One or more IDs do not exist',
    SEARCH_QUERY_INVALID_CHARACTERS = 'Search query cannot contain special characters.',
    CREATED_SUCCESSFULLY = 'created successfully.',
    INVALID_OLD_PASSWORD = 'invalid old password',
    EMAIL_ALREADY_EXIST = 'Email already exist',
    DEVICE_NOT_EXIST = 'Device does not exist',
    FAILED_TO_UPDATE = 'Failed to update',
    DEVICE_ALREADY_EXIST = 'Device already exist',
    NO_NEW_RECIPE = 'All devices are now cooking; currently, none are free. Please wait until a device becomes available.',
    DEVICE_ALREADY_IN_USE = 'This device is already connected to another user.',
    DEVICE_BINDING_NOT_FOUND = 'No binding found between this user and device.',
    GROUP_CONTAINS_DEVICES = 'Group cannot be deleted because it contains associated devices.',
    GROUP_ID_NOT_FOUND = 'Group ID not found',
    OTA_UPDATE_FAILED = '== OTA update failed',
    DEVICE_ALREADY_LINKED = 'The device is already linked to another user.',
}

export const SuccessMessage = 'success';
export const UnauthorizedMessage = 'Unauthorized';
export const InternalServerErrorMessage = 'Internal server error';
export const BadRequestMessage = 'Bad request';
