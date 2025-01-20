import { Module } from '@nestjs/common';
import { HomeScreenController } from './home-screen.controller';
import { HomeScreenService } from './home-screen.service';
import { PrismaService } from '@provider/prisma/prisma.service';

@Module({
    controllers: [HomeScreenController],
    providers: [HomeScreenService, PrismaService],
})
export class HomeScreenModule {}
