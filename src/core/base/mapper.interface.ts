export abstract class Mapper<TInput, TOutput> {
  abstract mapFrom(param: TInput): TOutput;
  abstract mapTo(param: TOutput): TInput;
}
