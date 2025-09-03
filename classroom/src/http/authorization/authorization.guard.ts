import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { auth } from 'express-oauth2-jwt-bearer';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJWT = promisify(
      auth({
        audience: this.AUTH0_AUDIENCE,
        issuerBaseURL: this.AUTH0_DOMAIN,
      }),
    );
    try {
      await checkJWT(req, res);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
