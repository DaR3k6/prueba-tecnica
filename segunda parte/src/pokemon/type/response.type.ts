export interface Response<T> {
  response: boolean;
  message: string;
  data: T | T[];
}
