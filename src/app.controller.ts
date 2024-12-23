import { Controller, Get } from '@nestjs/common';
// import { CustomLogger } from 'logger.service';

@Controller()
export class AppController {
    constructor() {}

    @Get()
    healthCheck() {
        // this.logger.log('walcome to server');
        // this.logger.error('This is an error log');
        // this.logger.debug('This is a debug log');
        return 'Server is running';
    }
}
