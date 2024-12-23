import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import appConfig from './config';
import { AppConfigService } from './config.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
            validationSchema: Joi.object({
                PORT: Joi.number().default(8080),
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test', 'staging')
                    .default('development'),
                JWT_EXPIRES_IN: Joi.string().required(),
                ACCESS_TOKEN_SECRET_EXPIRE: Joi.number().required(),
                REFRESH_TOKEN_SECRET_EXPIRE: Joi.number().required(),
            }),
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
