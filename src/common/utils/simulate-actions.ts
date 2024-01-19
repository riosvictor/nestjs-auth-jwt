export async function longRunningOperation(timeout: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}
