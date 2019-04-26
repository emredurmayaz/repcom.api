export class ApiResult {
  data: any;
  message: string;

  constructor(data: any, message: string) {
    this.data = data;
    this.message = message;
  }
}
