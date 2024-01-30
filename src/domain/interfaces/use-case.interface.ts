export interface UseCase<TResponse> {
  execute(...args: any[]): Promise<TResponse>;
}
