import {
    ClassSerializerInterceptor,
    Module,
    ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filter/all.exception.filter';
import { HttpExceptionFilter } from './common/filter/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AppConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './module/auth/auth.module';

import { PrismaModule } from './provider/prisma/prisma.module';
import { HomeScreenModule } from './module/home-screen/home-screen.module';

@Module({
    imports: [
        AppConfigModule,
        HealthModule,
        AuthModule,
        PrismaModule,
        HomeScreenModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        { provide: APP_PIPE, useClass: ValidationPipe },
    ],
})
export class AppModule {}
