import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    // JWT Configuration
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,

    // Email Configuration
    emailPort: process.env.PORT_OF_EMAIL,
    emailHost: process.env.HOST_OF_EMAIL,
    emailFrom: process.env.EMAIL_OF_USER,
    emailAppPassword: process.env.EMAIL_USER_APP_PASSWORD,

    // Server Configuration
    serverPort: process.env.PORT,

    // Token Expiry Configuration
    accessTokenSecretExpire: process.env.ACCESS_TOKEN_SECRET_EXPIRE,
    refreshTokenSecretExpire: process.env.REFRESH_TOKEN_SECRET_EXPIRE,

    // Admin Configuration
    superAdmin: process.env.SUPER_ADMIN,

    // SFTP Configuration
    sftpBaseUrl: process.env.SFTP_BASE_URL,
    sftpUsername: process.env.USERNAME_SFTP,
    sftpPassword: process.env.PASSWORD,
    sftpPort: process.env.SFTP_PORT,
    sftpHostname: process.env.SFTP_HOSTNAME,

    //Azure Configuration
    azureAccountKey: process.env.ACCOUNT_KEY,
    azureAccountName: process.env.ACCOUNT_NAME,
    azureContainerImages: process.env.CONTAINER_IMAGES,
    azureContainerVideos: process.env.CONTAINER_VIDEOS,
    azureContainerUserImages: process.env.CONTAINER_USER_IMAGES,
    azureContainerOtaFile: process.env.CONTAINER_OTA_FILE,
}));
