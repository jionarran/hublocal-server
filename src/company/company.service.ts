import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly locationService: LocationService,
  ) {}

  async create(data: CreateCompanyDto) {
    try {
      //@ts-ignore
      const company = await this.prisma.company.create({
        data,
      });

      return company;
    } catch (err) {
      console.log('error', err);
      throw new Error('Erro ao criar empresa');
    }
  }

  async findAll(userId: string) {
    const company = await this.prisma.company.findMany({
      where: { userId: userId },
    });

    await Promise.all(
      company.map(async (comp: any) => {
        const locate = await this.locationService.findByCompanyId(comp.id);
        comp.locations = locate;
      }),
    );

    return company;
  }

  findOne(id: string) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.prisma.company.findUnique({ where: { id: id } });

    if (!company) throw new Error(`Company not found`);
    const upCompany = await this.prisma.company.update({
      where: { id: id },
      data: updateCompanyDto,
    });

    return upCompany;
  }

  async remove(id: string) {
    const deletedCompany = await this.prisma.company.delete({
      where: { id: id },
    });

    return deletedCompany;
  }
}
