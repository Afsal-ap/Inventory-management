import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IItem } from '../../types/item';

export const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      console.log('Auth token:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.warn('No auth token found');
      }
      return headers;
    },
  }),
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    getItems: builder.query<IItem[], void>({
      query: () => '/items',
      providesTags: ['Item'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log('Fetched items:', data);
        } catch (error) {
          console.error('Failed to fetch items:', error);
        }
      },
    }),
    addItem: builder.mutation<IItem, Partial<IItem>>({
      query: (item) => ({
        url: '/items',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Item'],
    }),
    updateItem: builder.mutation<IItem, { id: string; data: Partial<IItem> }>({
      query: ({ id, data }) => {
        console.log('Updating item:', { id, data });
        return {
          url: `/items/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Item'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log('Update successful:', data);
        } catch (error) {
          console.error('Update failed:', error);
        }
      },
    }),
    deleteItem: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Item'],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;