import { useState } from 'react';
import {
  useGetSalesReportQuery,
  useGetItemReportQuery,
  useGetCustomerLedgerQuery,
} from '../store/slices/reportSlice';
import { format } from 'date-fns';
import { SalesReport, ItemReport, CustomerLedger } from '../types/report';

const Reports = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    customerId: '',
    itemId: '',
  });

  const { data: salesReport, isLoading: isSalesLoading } = useGetSalesReportQuery(filters);
  const { data: itemReport, isLoading: isItemLoading } = useGetItemReportQuery(filters);
  const { data: customerLedger, isLoading: isCustomerLoading } = useGetCustomerLedgerQuery(filters);
   
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
 
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-6 flex gap-4 flex-wrap">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={filters.customerId}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="text"
          name="itemId"
          placeholder="Item ID"
          value={filters.itemId}
          onChange={handleFilterChange}
          className="border p-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Filter</button>
      </form>

      {/* Sales Report */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Sales Report</h2>
        <div className="flex gap-2 mb-4">
          <button onClick={() => window.print()} className="p-2 bg-green-500 text-white">Print</button>
        </div>
        {isSalesLoading ? (
          <p>Loading Sales Report...</p>
        ) : (
          <div>
            <p>Total Sales: {salesReport?.totalSales}</p>
            <p>Total Quantity: {salesReport?.totalQuantity}</p>
            <p>Total Revenue: {salesReport?.totalRevenue}</p>

            <table className="w-full bg-white shadow-md rounded mt-4 table-auto">
  <thead className="bg-gray-200">
    <tr>
      <th className="p-3 text-left">Item</th>
      <th className="p-3 text-left">Customer</th>
      <th className="p-3 text-left">Quantity</th>
      <th className="p-3 text-left">Cash/Credit</th>
      <th className="p-3 text-left">Total</th>
      <th className="p-3 text-left">Date</th>
    </tr>
  </thead>
  <tbody>
    {salesReport?.sales?.map((sale) => (
      <tr key={sale._id} className="border-t hover:bg-gray-50">
        <td className="p-3 align-middle">{sale.item?.name || 'N/A'}</td>
        <td className="p-3 align-middle">{sale.customer?.name || 'N/A'}</td>
        <td className="p-3 align-middle">{sale.quantity}</td>
        <td className="p-3 align-middle">{sale.isCash ? 'Cash' : 'Credit'}</td>
        <td className="p-3 align-middle"> {(Number(sale?.quantity) * Number(sale?.item?.price)).toFixed(2)}</td>
        <td className="p-3 align-middle">{format(new Date(sale.date), 'dd/MM/yyyy')}</td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        )}
      </div>

      {/* Item Report */}
      <div>
        <h2 className="text-xl font-semibold mt-8 mb-2">Item Report</h2>
        <div className="flex gap-2 mb-4">
          <button onClick={() => window.print()} className="p-2 bg-green-500 text-white">Print</button>
          <a href="/api/item-report/excel" target="_blank" className="p-2 bg-yellow-500 text-white">Export Excel</a>
          <a href="/api/item-report/pdf" target="_blank" className="p-2 bg-red-500 text-white">Export PDF</a>
        </div>
        {isItemLoading ? (
          <p>Loading Item Report...</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded mt-4 table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Total Quantity Sold</th>
              <th className="p-3 text-left">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {itemReport?.items?.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-3 align-middle">{item.name}</td>
                <td className="p-3 align-middle">{item.totalQuantity}</td>
                <td className="p-3 align-middle">{item.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        )}
      </div>

      {/* Customer Ledger */}
      <div>
        <h2 className="text-xl font-semibold mt-8 mb-2">Customer Ledger</h2>
        <div className="flex gap-2 mb-4">
          <button onClick={() => window.print()} className="p-2 bg-green-500 text-white">Print</button>
          <a
            href={`/api/reports/customer-ledger/:customerId/excel?customerId=${filters.customerId}`}
            target="_blank"
            className="p-2 bg-yellow-500 text-white"
          >
            Export Excel
          </a>
          <a
            href={`/api/reports/customer-ledger/${filters.customerId}/excel`}
            target="_blank"
            className="p-2 bg-red-500 text-white"
          >
            Export PDF
          </a>
        </div>
        {isCustomerLoading ? (
          <p>Loading Customer Ledger...</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded mt-4">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Customer</th>
                <th className="p-2">Total Purchases</th>
                <th className="p-2">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {customerLedger?.map((customer) => (
                <tr key={customer._id} className="border-t">
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.totalPurchases}</td>
                  <td className="p-2">{customer.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reports;
