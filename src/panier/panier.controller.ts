import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { PanierService } from './panier.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ItemPanierDto } from './dto/itemPanier.dto';

@ApiTags('Panier')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('panier')
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post(':clientId/valider')
  @ApiOperation({ summary: 'Panier' })
  @ApiBody({ description: 'Valider le panier' })
  @ApiResponse({ status: 201, description: 'Panier validé' })
  @ApiBadRequestResponse({
    description: "Le panier n'est pas valide"
  })
  async valider(
    @Param('clientId') clientId: string,
    @Body() items: ItemPanierDto[]
  ) {
    return this.panierService.valider(clientId, items);
  }
}
