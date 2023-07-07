import { AxiosPromise, AxiosError } from 'axios';

import { RootState, AppDispatch } from '@app/store';
import { ApiErrorResponse } from '@common/types';

import { createAsyncThunk } from '@reduxjs/toolkit';

type ApiFunction<RequestParams, ResponseSchema> = (
  axiosParams: RequestParams
) => AxiosPromise<{
  data: ResponseSchema;
  message: string;
}>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: ApiErrorResponse
}>();

export const createAsyncThunkFromApi = <ResponseSchema, RequestParams = never>(
  typePrefix: string,
  apiFunction: ApiFunction<RequestParams, ResponseSchema>
) => {
  return createAppAsyncThunk<ResponseSchema, RequestParams>(
    typePrefix,
    async (args, thunkApi) => {
      try {
        const response = await apiFunction(args);
        
        return response.data.data;
      } catch (err) {
        const genericErrorMsg = {
          data: null,
          message: 'Oops! Something went wrong - please try again later.'
        };

        return thunkApi.rejectWithValue((err instanceof AxiosError)
          ? err.response?.data || genericErrorMsg
          : genericErrorMsg
        );
      }
    }
  );
};