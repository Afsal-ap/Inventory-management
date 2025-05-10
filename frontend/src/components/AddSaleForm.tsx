import { useState, useEffect } from 'react';
import { useAddSaleMutation } from '../store/slices/saleslice';
import { useGetItemsQuery } from '../store/slices/itemSlice';
import { useGetCustomersQuery } from '../store/slices/customerSlice';
import { SaleFormInput } from '../types/sale';

interface Props {
  onSaleAdded: () => void;
}

const AddSaleForm = ({ onSaleAdded }: Props) => {
  const [form, setForm] = useState<SaleFormInput>({
    itemId: '',
    customerId: '',
    quantity: 1,
    isCash: true,
  });

  const { data: items = [] } = useGetItemsQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const [addSale, { isLoading, error, isSuccess }] = useAddSaleMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    const updatedValue = type === 'checkbox'
      ? (e.target as HTMLInputElement).checked 
      : value;
  
    setForm((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const backendPayload = {
        item: form.itemId,
        customer: form.customerId,
        quantity: form.quantity,
        isCash: form.isCash,
      };
  
      await addSale(backendPayload).unwrap();
      setForm({ itemId: '', customerId: '', quantity: 1, isCash: true });
      onSaleAdded();
    } catch (err) {
      console.error('Failed to add sale', err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="itemId" value={form.itemId} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <select name="customerId" value={form.customerId} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>{customer.name}</option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min={1}
          className="border p-2 rounded"
          placeholder="Quantity"
          required
        />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isCash" checked={form.isCash} onChange={handleChange} />
          <span>Cash Sale?</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isLoading ? 'Saving...' : 'Add Sale'}
      </button>

      {error && <p className="text-red-500 mt-2">Error: Something went wrong.</p>}
      {isSuccess && <p className="text-green-600 mt-2">Sale added successfully.</p>}
    </form>
  );
};

export default AddSaleForm;
