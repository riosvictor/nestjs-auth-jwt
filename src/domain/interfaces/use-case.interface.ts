export interface IUseCase<TResponse> {
  execute(...args: any[]): Promise<TResponse>;
}
