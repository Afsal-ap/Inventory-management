import { useState } from 'react';
import AddItemForm from '../components/AddItemForm';
import { IItem } from '../types/item';
import {
  useGetItemsQuery,
  useUpdateItemMutation,
  useDeleteItemMutation,
} from '../store/slices/itemSlice';
 import EditItemForm from '../components/EditItemForm';
import ConfirmModal from '../components/ConfirmModal';

const Inventory = () => {
  const { data: items = [], refetch } = useGetItemsQuery();
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const [editingItem, setEditingItem] = useState<IItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Check for duplicate _id values
  const idSet = new Set(items.map((item) => item.id));
  if (idSet.size !== items.length) {
    console.warn('Duplicate _id values detected in items:', items);
  }

  console.log('editingItem:', editingItem);
  console.log('Items:', items);

  const handleUpdate = async (id: string, data: Partial<IItem>) => {
    try {
      await updateItem({ id, data }).unwrap();
      setEditingItem(null);
      refetch();
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };
  


  const handleConfirmDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteItem(confirmDeleteId).unwrap();
        setConfirmDeleteId(null);
        refetch();
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <AddItemForm onItemAdded={refetch} />

      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Description</th>
            <th className="text-left p-2">Quantity</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {items.map((item) => {
  const isEditing = editingItem !== null && editingItem.id === item.id;

  return isEditing ? (
    <EditItemForm
      key={item.id}
      item={item}
      onSave={(updatedData) => handleUpdate(item.id, updatedData)}
      onCancel={() => setEditingItem(null)}
    />
  ) : (
    <tr key={item.id}>
      <td className="p-2">{item.name}</td>
      <td className="p-2">{item.description}</td>
      <td className="p-2">{item.quantity}</td>
      <td className="p-2">{item.price}</td>
      <td className="p-2">
        <button
          onClick={() => setEditingItem(item)}
          className="text-blue-600 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => setConfirmDeleteId(item.id)}
          className="text-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
})}

</tbody>




      </table>

      {confirmDeleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this item?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}
    </div>
  );
};

export default Inventory;