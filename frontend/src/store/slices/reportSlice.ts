// saleApiSlice.ts (or a new reportsApiSlice.ts if you prefer separation)
import { baseApi } from '../../api/baeApi';
import { SalesReport, ItemReport, CustomerLedger } from '../../types/report';

export const reportApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesReport: builder.query<
      SalesReport,
      { startDate: string; endDate: string; customerId: string; itemId: string }
    >({
      query: (filters) => ({
        url: '/reports/sales',
        params: filters,
      }),
      providesTags: ['Report'],
    }),

    getItemReport: builder.query<
      ItemReport,
      { startDate: string; endDate: string; customerId: string; itemId: string }
    >({
      query: (filters) => ({
        url: '/reports/items',
        params: filters,
      }),
      providesTags: ['Report'],
    }),

    getCustomerLedger: builder.query<
      CustomerLedger[],
      { startDate: string; endDate: string; customerId: string; itemId: string }
    >({
      query: (filters) => ({
        url: '/customer/ledger',
        params: filters,
      }),
      providesTags: ['Report'],
    }),
  }),
});

export const {
  useGetSalesReportQuery,
  useGetItemReportQuery,
  useGetCustomerLedgerQuery,
} = reportApiSlice;
