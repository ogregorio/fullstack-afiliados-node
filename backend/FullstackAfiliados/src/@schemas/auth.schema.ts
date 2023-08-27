import { ApiProperty } from '@nestjs/swagger';

export const AuthSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'name',
      default: 'name',
    },
    token: {
      type: 'string',
      default: 'token',
      description: 'token',
    },
    expiresIn: {
      type: 'string',
      default: 'date',
      description: 'date',
    },
  },
};

export class AuthPayload {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
