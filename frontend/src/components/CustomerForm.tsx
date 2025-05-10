import { useState, useEffect } from 'react';
import { ICustomer } from '../types/customer';

interface Props {
  initialData?: ICustomer | null;
  onSave: (data: Partial<ICustomer>) => void;
  onCancel: () => void;
}

const CustomerForm = ({ initialData, onSave, onCancel }: Props) => {
  const [form, setForm] = useState({ name: '', address: '', mobile: '' });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="border p-2 w-full" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required className="border p-2 w-full" />
      <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" required className="border p-2 w-full" />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  );
};

export default CustomerForm;
