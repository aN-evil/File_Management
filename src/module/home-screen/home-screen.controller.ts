import {
    Controller,
    Get,
    Param,
    Patch,
    Delete,
    Body,
    UseGuards,
    Post,
    Query,
} from '@nestjs/common';
import { HomeScreenService } from './home-screen.service';
import { JwtAuthGuard } from '@common/auth/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateHomeScreenDto } from './dto/create-home-screen.dto';
import { UpdateHomeScreenDto } from './dto/update-home-screen.dto';
import { SearchHomeScreenDto } from './dto/serach-home-screen.dto';

@Controller('home-screen')
@ApiTags('HomeScreen')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class HomeScreenController {
    constructor(private readonly homeScreenService: HomeScreenService) {}

    @Post()
    async create(@Body() createHomeScreenDto: CreateHomeScreenDto) {
        return this.homeScreenService.create(createHomeScreenDto);
    }
    @Get()
    async getAll() {
        return this.homeScreenService.getAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.homeScreenService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateData: UpdateHomeScreenDto,
    ) {
        return this.homeScreenService.update(id, updateData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.homeScreenService.remove(id);
    }

    @Get('search/home')
    async search(@Query() searchDto: SearchHomeScreenDto) {
        return this.homeScreenService.search(searchDto);
    }
}
