import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
// import { CreateLocationDto } from './dto/create-location.dto';
// import { UpdateLocationDto } from './dto/update-location.dto';

interface UpdateLocationDto {
  name?: string;
  zip?: string;
  number?: number;
  street?: string;
  neighbourhood?: string;
  state?: string;
  city?: string;
  companyId: string;
}

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: any) {
    return this.locationService.create({
      ...createLocationDto,
    });
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
