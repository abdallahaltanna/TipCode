//  Generic error class to handle all errors in the application
class GenericError extends Error {
  status: number;
  msg: string;

  constructor(status: number, msg: string) {
    super(msg);
    this.status = status;
    this.msg = msg;
  }
}

export default GenericError;
