import { useState } from 'react';
import { IItem } from '../types/item';

interface EditItemFormProps {
  item: IItem;
  onSave: (updatedData: Partial<IItem>) => void;
  onCancel: () => void;
}

const EditItemForm = ({ item, onSave, onCancel }: EditItemFormProps) => {
  const [form, setForm] = useState({
    name: item.name,
    description: item.description || '',
    quantity: item.quantity,
    price: item.price,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'quantity' || name === 'price' ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert('Name is required');
      return;
    }
    
    if (form.quantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }
    if (form.price < 0) {
      alert('Price cannot be negative');
      return;
    }

    console.log('Saving item:', form);
    onSave({
      name: form.name,
      description: form.description,
      quantity: form.quantity,
      price: form.price,
    });
  };

  return (
    <tr className="bg-gray-100">
      <td className="p-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-1 w-full"
          required
        />
      </td>
      <td className="p-2">
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-1 w-full"
        />
      </td>
      <td className="p-2">
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          className="border p-1 w-full"
          min="0"
        />
      </td>
      <td className="p-2">
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="border p-1 w-full"
          min="0"
          step="0.01"
        />
      </td>
      <td className="p-2">
        <button
          onClick={handleSubmit}
          className="text-green-600 mr-2"
        >
          Save
        </button>
        <button
          onClick={() => {
            console.log('Cancel clicked');
            onCancel();
          }}
          className="text-gray-600"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditItemForm;