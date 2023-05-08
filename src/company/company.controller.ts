import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { CompanyService } from './company.service';
// import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface UpdateCompanyDto {
  name?: string;
  url?: string;
  cnpj?: string;
  userId: string;
  created_at?: string;
}

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  create(@Request() req: any) {
    return this.companyService.create({ ...req.body, userId: req.user.id });
  }

  @Get()
  findAll(@Request() req: any) {
    return this.companyService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
