import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';

import { TerminusLogger } from './terminus-logger.service';
import { PrismaModule } from '../provider/prisma/prisma.module';
import { PrismaHealthIndicator } from '../provider/prisma/prisma-health.indicator';

@Module({
    imports: [
        TerminusModule.forRoot({
            logger: TerminusLogger,
            errorLogStyle: 'pretty',
        }),
        HttpModule,
        PrismaModule,
    ],
    controllers: [HealthController],
    providers: [PrismaHealthIndicator],
})
export class HealthModule {}
