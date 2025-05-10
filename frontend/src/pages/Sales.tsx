import AddSaleForm from '../components/AddSaleForm';
import { useGetSalesQuery } from '../store/slices/saleslice';
import { format } from 'date-fns';

const Sales = () => {
  const { data: sales = [], isLoading, refetch } = useGetSalesQuery();
   
   console.log(sales, "dataaa")
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales</h1>
      <AddSaleForm onSaleAdded={refetch} />

      {isLoading ? (
        <p>Loading sales...</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Quantity</th>
              <th className="p-2 text-left">Cash/Credit</th>
              <th className="p-2 text-left">Total price</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id} className="border-t">
                <td className="p-2">{sale.item?.name || 'Unknown Item'}</td>
                <td className="p-2">{sale.customer?.name}</td>
                <td className="p-2">{sale.quantity}</td>
                <td className="p-2">{sale.isCash ? 'Cash' : 'Credit'}</td>
                <td className="p-2">{sale.item?.price ?? 'N/A'}</td>
                <td className="p-2">{format(new Date(sale.date), 'dd/MM/yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Sales;
