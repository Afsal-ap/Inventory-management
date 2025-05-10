import { useState } from 'react';
import { useAddItemMutation } from '../store/slices/itemSlice';

interface Props {
  onItemAdded: () => void;
}

const AddItemForm: React.FC<Props> = ({ onItemAdded }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  });

  const [addItem, { isLoading }] = useAddItemMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'name' || name === 'description' ? value : +value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addItem(form);
    setForm({ name: '', description: '', quantity: 0, price: 0 });
    onItemAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-5 gap-4 items-end">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2" />
      <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Qty" className="border p-2" required />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Item'}
      </button>
    </form>
  );
};

export default AddItemForm;
