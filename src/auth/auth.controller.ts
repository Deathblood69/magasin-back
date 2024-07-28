import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common'
import {AuthService} from './auth.service'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import {LoginDto} from './dto/login.dto'
import {Request, Response} from 'express'
import {extractTokenFromHeader} from '../common/utils/tokenUtils'

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Annotation Swagger
  @ApiOperation({summary: 'Login'})
  @ApiBody({description: 'Login credentials', type: LoginDto})
  @ApiResponse({status: 201, description: 'Authentification réussie'})
  @ApiBadRequestResponse({
    description: "Nom d'utilisateur ou mot de passe incorrect",
  })
  //Annotation NestJS
  @Post('login')
  async login(
    @Res() res: Response,
    @Body() body: {username: string; password: string},
  ) {
    const tokenObject = await this.authService.login(
      body.username,
      body.password,
    )
    res.cookie('Authorization', encodeURIComponent(tokenObject.token), {
      httpOnly: true,
      secure: true,
    })
    res.send({username: body.username, roles: tokenObject.roles})
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    // Supprimer le cookie
    res.clearCookie('Authorization')
    res.send('Logged out')
  }

  /**
   * Permet à l'utilisateur de se reconnecter à l'application
   * @param res - Response
   * @param req - Request
   */
  @ApiOperation({summary: "Tentative de reconnexion de l'utilisateur"})
  @Post('login/refresh')
  async isAuthenticated(@Res() res: Response, @Req() req: Request) {
    const token = extractTokenFromHeader(req)
    if (!token) {
      res.status(401).send('Unautenticated')
    } else {
      res.send(this.authService.decodeToken(token))
    }
  }
}
