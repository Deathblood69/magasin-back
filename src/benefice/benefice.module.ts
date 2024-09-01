import { Module } from '@nestjs/common';
import { BeneficeService } from './benefice.service';
import { JwtService } from '@nestjs/jwt';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BeneficeController } from './benefice.controller';
import { Course } from '../entities/Course';
import { Achat } from '../entities/Achat';
import { Vente } from '../entities/Vente';

@Module({
  imports: [MikroOrmModule.forFeature([Course, Achat, Vente])],
  controllers: [BeneficeController],
  providers: [BeneficeService, JwtService]
})
export class BeneficeModule {}
