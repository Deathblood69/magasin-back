import { ApiProperty } from '@nestjs/swagger';
import { DEV_CONFIG } from '../../common/config/app.config';

export class LoginDto {
  @ApiProperty({ default: DEV_CONFIG.login })
  username: string;

  @ApiProperty({ default: DEV_CONFIG.password })
  password: string;
}
