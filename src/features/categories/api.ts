import api from '@services/api';

export type CategoryData = {
  _id: string;
  name: string;
  channelIds: string[];
};

const categoryApi = api.injectEndpoints({
  endpoints(build) {
    return {
      getCategories: build.query<CategoryData[], string>({
        query: (serverId) => ({
          url: `/servers/${serverId}/categories`,
          method: 'get',
        }),
      }),
    };  
  }
});

export default categoryApi;

export const {
  useGetCategoriesQuery,
} = categoryApi;