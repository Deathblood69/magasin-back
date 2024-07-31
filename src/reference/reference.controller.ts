import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags('Reference')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get(':ref')
  find(@Param('ref') ref: string) {
    return this.referenceService.find(ref);
  }
}
