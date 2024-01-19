import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExecutionTimeMiddleware implements NestMiddleware {
  private readonly _logger = new Logger(ExecutionTimeMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const end = Date.now();
      const duration = end - start;
      this._logger.log(
        `Request to [${req.method}] ${req.path} took ${duration}ms`,
      );
    });

    next();
  }
}
