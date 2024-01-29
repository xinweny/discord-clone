export type ApiErrorResponse = {
  data: any;
  message: string;
};

export type ErrorResponse  = {
  status: number;
  data: ApiErrorResponse;
};