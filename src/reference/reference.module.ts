import { Module } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { ReferenceController } from './reference.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ReferenceController],
  providers: [ReferenceService, JwtService]
})
export class ReferenceModule {}
