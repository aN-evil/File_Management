import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@provider/prisma/prisma.service';
import { CreateHomeScreenDto } from './dto/create-home-screen.dto';
import { instanceToPlain } from 'class-transformer';
import { UpdateHomeScreenDto } from './dto/update-home-screen.dto';
import { SearchHomeScreenDto } from './dto/serach-home-screen.dto';

@Injectable()
export class HomeScreenService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.homeScreen.findMany({
            select: {
                id: true,
                placeName: true,
                partyName: true,
            },
        });
    }

    async create(createHomeScreenDto: CreateHomeScreenDto) {
        const { partyName, placeName, files } = createHomeScreenDto;

        const filesWithAutoDate = files?.map((file) => ({
            ...file,
            date: new Date().toISOString(),
        }));

        return this.prisma.homeScreen.create({
            data: {
                partyName,
                placeName,
                files: filesWithAutoDate || null,
                date: new Date().toISOString(),
            },
        });
    }
    async findOne(id: string) {
        const homeScreen = await this.prisma.homeScreen.findUnique({
            where: { id },
            select: {
                id: true,
                placeName: true,
                partyName: true,
                date: true,
                files: true,
            },
        });
        if (!homeScreen) {
            throw new NotFoundException(`HomeScreen with id ${id} not found`);
        }
        return homeScreen;
    }

    async update(id: string, updateData: UpdateHomeScreenDto) {
        const { partyName, placeName, files } = updateData;
        await this.findOne(id);
        const filesWithAutoDate = files?.map((file) => ({
            ...file,
            date: new Date().toISOString(),
        }));
        const homeScreen = await this.prisma.homeScreen.update({
            where: { id },
            data: {
                partyName,
                placeName,
                files: filesWithAutoDate || null,
                date: new Date().toISOString(),
            },
        });
        return homeScreen;
    }

    async remove(id: string) {
        await this.findOne(id);
        const homeScreen = await this.prisma.homeScreen.delete({
            where: { id },
        });
        return homeScreen;
    }

    async search(searchDto: SearchHomeScreenDto) {
        const { partyName, placeName, date, fileName } = searchDto;

        const whereClause: any = {};

        if (partyName) {
            whereClause.partyName = {
                contains: partyName,
                mode: 'insensitive',
            };
        }

        if (placeName) {
            whereClause.placeName = {
                contains: placeName,
                mode: 'insensitive',
            };
        }

        if (date) {
            whereClause.date = { equals: date };
        }

        const records = await this.prisma.homeScreen.findMany({
            where: whereClause,
        });

        if (fileName) {
            const filteredRecords = records.filter((record) =>
                record.files?.some((file: any) => file.name === fileName),
            );
            return filteredRecords;
        }

        return records;
    }
}
