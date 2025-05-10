interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <p className="mb-4">{message}</p>
          <div className="flex justify-end">
            <button onClick={onCancel} className="mr-4 text-gray-700">Cancel</button>
            <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-1 rounded">Delete</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;
  