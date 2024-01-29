import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExecutionTimeMiddleware implements NestMiddleware {
  private readonly _logger = new Logger(ExecutionTimeMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const end = Date.now();
      const durationMs = end - start;
      const { method, path } = req;
      const durationText =
        durationMs > 1000
          ? `${(durationMs / 1000).toFixed(2)}s`
          : `${durationMs}ms`;

      this._logRequestDuration(method, path, durationText);
    });

    next();
  }

  private _logRequestDuration(
    method: string,
    path: string,
    durationText: string,
  ) {
    this._logger.log(`Request to [${method}] ${path} took ${durationText}`);
  }
}
