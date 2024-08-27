import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags('Catalogue')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Get('all')
  @ApiOperation({ summary: 'Récupérer tout le catalogue' })
  @ApiResponse({ status: 200, description: 'Catalogue' })
  @ApiBadRequestResponse({
    description: 'Les catalogues des courses sont invalides'
  })
  async recupererCatalogue() {
    return await this.catalogueService.recupererCatalogue();
  }
}
