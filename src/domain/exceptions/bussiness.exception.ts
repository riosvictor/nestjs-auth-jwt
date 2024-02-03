type TBusinessError = 'NOT_FOUND';

type Props = {
  name: TBusinessError;
  message: string;
  cause?: any;
};

export class BusinessException extends Error {
  name: TBusinessError;
  message: string;
  cause: any;

  constructor({ name, message, cause }: Props) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
