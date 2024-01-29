import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionTimeMiddleware } from './execution-time.middleware';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

jest.useFakeTimers();

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

  it('should log request duration for fast request', () => {
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
    expect(logger).toHaveBeenCalledWith(expect.stringContaining('ms'));
  });

  it('should log request duration for slow request', () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          setTimeout(callback, 1500);
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

    jest.advanceTimersByTime(2000);

    expect(mockResponse.on).toHaveBeenCalledWith(
      'finish',
      expect.any(Function),
    );
    expect(logger).toHaveBeenCalledWith(expect.stringContaining('Request to'));
    expect(logger).toHaveBeenCalledWith(expect.stringContaining('s'));

    jest.useRealTimers();
  });
});
