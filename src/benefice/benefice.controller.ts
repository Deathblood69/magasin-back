import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BeneficeService } from './benefice.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags('Benefice')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('benefice')
export class BeneficeController {
  constructor(private readonly beneficeService: BeneficeService) {}

  @Get('all')
  @ApiOperation({ summary: 'Récupérer tout les bénéfices' })
  @ApiResponse({ status: 200, description: 'Bénéfices de toutes les courses' })
  @ApiBadRequestResponse({
    description: 'Les bénéfices des courses sont invalides'
  })
  async calculerAllBenefices() {
    return await this.beneficeService.calculerBeneficeAllCourse();
  }

  @Get(':courseId')
  @ApiOperation({ summary: "Récupérer les bénéfices d'une course" })
  @ApiResponse({ status: 200, description: "Bénéfices d'une course" })
  @ApiBadRequestResponse({
    description: 'Les bénéfices sont invalides'
  })
  async calculerBenefice(@Param('courseId') courseId: string) {
    return await this.beneficeService.calculerBeneficeCourse(courseId);
  }
}
