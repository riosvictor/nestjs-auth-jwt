import { longRunningOperation } from './simulate-actions';

describe('longRunningOperation function', () => {
  it('should resolve after the specified timeout', async () => {
    const timeout = 50;
    const startTime = Date.now();
    await longRunningOperation(timeout);
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(timeout);
  });

  it('should not throw any errors', async () => {
    await expect(longRunningOperation(100)).resolves.not.toThrow();
  });

  it('should resolve immediately if timeout is set to 0', async () => {
    const startTime = Date.now();
    await longRunningOperation(0);
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(10);
  });
});
