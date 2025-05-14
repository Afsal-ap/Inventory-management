import { useState } from 'react';
import { useGetCustomersQuery, useDeleteCustomerMutation, useUpdateCustomerMutation, useAddCustomerMutation } from '../store/slices/customerSlice';
import CustomerForm from '../components/CustomerForm';
import ConfirmModal from '../components/ConfirmModal';
import { ICustomer } from '../types/customer';

const Customer = () => {
  const { data: customers = [], refetch } = useGetCustomersQuery();
  const [addCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.mobile.includes(search));

  const handleSave = async (data: Partial<ICustomer>) => {
    if (editingCustomer) {
      await updateCustomer({ id: editingCustomer._id, data });
    } else {
      await addCustomer(data);
    }
    refetch();
    setEditingCustomer(null);
    setShowForm(false);
  };

  const handleDelete = async () => {
    if (confirmId) {
      await deleteCustomer(confirmId);
      setConfirmId(null);
      refetch();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button onClick={() => { setEditingCustomer(null); setShowForm(true); }} className="bg-green-600 text-white px-4 py-2 rounded">
          Add Customer
        </button>
      </div>

      {showForm && (
        <CustomerForm
          initialData={editingCustomer}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingCustomer(null); }}
        />
      )}

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Address</th>
            <th className="p-2 text-left">Mobile</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((cust) => (
            <tr key={cust._id} className="border-t">
              <td className="p-2">{cust.name}</td>
              <td className="p-2">{cust.address}</td>
              <td className="p-2">{cust.mobile}</td>
              <td className="p-2">
                <button onClick={() => { setEditingCustomer(cust); setShowForm(true); }} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => setConfirmId(cust._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmId && (
        <ConfirmModal
          message="Are you sure you want to delete this customer?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
};

export default Customer;
