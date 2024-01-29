import api from '@services/api';

import type {
  CategoryData,
  CreateCategoryFields,
  EditCategoryFields,
  DeleteCategoryFields,
} from './types';

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
          data: { name },
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Categories', id: serverId }],
      }),
      editCategory: build.mutation<CategoryData, EditCategoryFields>({
        query: ({ serverId, categoryId, name }) => ({
          url: `/servers/${serverId}/categories/${categoryId}`,
          method: 'put',
          data: { name },
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Categories', id: serverId }],
      }),
      deleteCategory: build.mutation<CategoryData, DeleteCategoryFields>({
        query: ({ serverId, categoryId }) => ({
          url: `/servers/${serverId}/categories/${categoryId}`,
          method: 'delete',
        }),
        invalidatesTags: (...[, , { serverId }]) => [{ type: 'Categories', id: serverId }, { type: 'Channels', id: serverId }],
      }),
    };  
  }
});

export default categoryApi;

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;