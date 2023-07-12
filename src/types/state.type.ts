import { ApiErrorResponse } from '.';

export interface IState<Data> {
  data: Data | null;
  pending: boolean;
  error?: ApiErrorResponse | null;
}