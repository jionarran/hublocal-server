import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LocationService } from 'src/location/location.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, LocationService],
  imports: [PrismaModule],
})
export class CompanyModule {}
