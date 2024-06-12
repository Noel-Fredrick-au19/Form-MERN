import React, { useState } from "react";
import useStore from "../store/store";

interface EditItemProps {
  item: {
    _id: string;
    name: string;
    description: string;
  };
  setIsEditing: (isEditing: boolean) => void;
}

const EditItem: React.FC<EditItemProps> = ({ item, setIsEditing }) => {
  const { updateItem } = useStore();
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && description) {
      updateItem(item._id, name, description);
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 w-full"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-[#98c1d9] text-white px-4 py-2 rounded"
        >
          Update Item
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
export default EditItem;
