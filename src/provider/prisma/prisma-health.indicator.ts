import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from './prisma.service'; // Adjust the import according to your structure

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async isHealthy(key: string): Promise<HealthIndicatorResult> {
        try {
            // Execute a simple query to check database connection
            await this.prisma.$executeRaw`SELECT 1`;
            return this.getStatus(key, true);
        } catch (error) {
            return this.getStatus(key, false, { message: error.message });
        }
    }
}
