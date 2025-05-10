// src/store/slices/saleApiSlice.ts
import { baseApi } from '../../api/baeApi'; // Ensure correct spelling
import { Sale } from '../../types/sale';

export const saleApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<Sale[], void>({
      query: () => '/sales',
      providesTags: ['Sale'],
    }),
    addSale: builder.mutation<Sale, {
      item: string;
      customer: string;
      quantity: number;
      isCash: boolean;
    }>({
      query: (sale) => ({
        url: '/sales',
        method: 'POST',
        body: sale,
      }),
      invalidatesTags: ['Sale', 'Report', 'Item'],
    }),
  }),
});

export const { useGetSalesQuery, useAddSaleMutation } = saleApiSlice;
