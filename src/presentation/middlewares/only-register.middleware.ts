import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OnlyRegisterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isRegisterRoute =
      req.path.endsWith('/register') ||
      req.originalUrl.endsWith('/register') ||
      req.path === '/auth/login';

    if (req.method === 'POST' && isRegisterRoute) {
      next();
    } else {
      throw new ForbiddenException(
        'Only registration is allowed explicitly by this middleware',
      );
    }
  }
}
