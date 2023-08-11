import api from '@services/api';

import type { CategoryData, CreateCategoryFields } from './types';

const categoryApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getCategories: build.query<CategoryData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/categories`,
          method: 'get',
        }),
        providesTags: (...[, , serverId]) => [{ type: 'Categories', id: serverId }],
      }),
      createCategory: build.mutation<CategoryData, CreateCategoryFields>({
        query: ({ serverId, name }) => ({
          url: `/servers/${serverId}/categories`,
          method: 'post',
          data: {
            name,
          },
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Categories', id: serverId }],
      }),
    };  
  }
});

export default categoryApi;

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} = categoryApi;