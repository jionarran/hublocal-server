import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
// import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    const created = await this.prisma.location.create({
      data: createLocationDto,
    });

    return created;
  }

  async findAll() {
    const allLocations = await this.prisma.location.findMany();
    return allLocations;
  }

  async findByCompanyId(companyId: string) {
    const location = await this.prisma.location.findMany({
      where: { companyId: companyId },
    });

    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const location = await this.prisma.location.findUnique({
      where: { id: id },
    });

    if (!location) throw new Error(`Location not found`);
    const upLocation = await this.prisma.location.update({
      where: { id: id },
      data: updateLocationDto,
    });

    return upLocation;
  }

  async remove(id: string) {
    const deletedCompany = await this.prisma.company.delete({
      where: { id: id },
    });

    return deletedCompany;
  }
}
