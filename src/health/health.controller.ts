import { Controller, Get } from '@nestjs/common';
import {
    HealthCheckService,
    HttpHealthIndicator,
    HealthCheck,
    DiskHealthIndicator,
    MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaHealthIndicator } from '../provider/prisma/prisma-health.indicator';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private readonly disk: DiskHealthIndicator,
        private prismaHealthIndicator: PrismaHealthIndicator,
        private memory: MemoryHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'http://localhost:3000'),
            () => this.prismaHealthIndicator.isHealthy('database'),
            // () =>
            //     this.disk.checkStorage('storage', {
            //         path: '/',
            //         threshold: 250 * 1024 * 1024 * 1024,
            //     }),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            // () =>
            //     this.disk.checkStorage('storage', {
            //         path: '/',
            //         thresholdPercent: 0.5,
            //     }),
        ]);
    }
}
