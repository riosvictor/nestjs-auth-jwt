import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionTimeMiddleware } from '@/infra/middleware/execution-time.middleware';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

describe('ExecutionTimeMiddleware', () => {
  let middleware: ExecutionTimeMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionTimeMiddleware, Logger],
    }).compile();

    middleware = module.get<ExecutionTimeMiddleware>(ExecutionTimeMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log execution time on response finish', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
      }),
    };
    const mockNextFunction = jest.fn();
    const logger = jest.spyOn(Logger.prototype, 'log');

    middleware.use(
      mockRequest,
      mockResponse as unknown as Response,
      mockNextFunction,
    );

    expect(mockResponse.on).toHaveBeenCalledWith(
      'finish',
      expect.any(Function),
    );
    expect(logger).toHaveBeenCalledWith(expect.stringContaining('Request to'));
  });
});
