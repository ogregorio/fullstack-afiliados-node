import { Controller, Post, UseGuards, Body, HttpCode } from '@nestjs/common';
import { AuthService } from 'src/@core/auth/auth.service';
import { LocalAuthGuard } from 'src/@auth/local-auth.guard';
import { AuthPayload as AuthPayloadType } from 'src/@types/user.type';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthPayload, AuthSchema } from 'src/@schemas/auth.schema';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  @ApiBody({ type: AuthPayload })
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'Authenticate user payload',
    schema: AuthSchema,
    isArray: false,
  })
  @HttpCode(200)
  async login(@Body() user: AuthPayloadType) {
    return this.authService.login(user);
  }
}
