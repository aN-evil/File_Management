import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('App');
    app.use(compression());
    // Enable Helmet for securing HTTP headers
    app.use(helmet());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    const configService = app.get(AppConfigService);
    const port = configService.port;

    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('mqtt-backend-server')
        .setDescription(
            'API documentation for the mqtt backend server application',
        )
        .setVersion('1.0')
        .addTag('MQTT-BACKEND-SERVER')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    logger.log('Starting NestJS application...');
    await app.listen(port);
    logger.log(`🌍 Server is running on port: ${port}...`);
}
bootstrap();
