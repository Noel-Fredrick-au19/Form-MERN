import create from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

interface Item {
  order: any;
  _id: string;
  name: string;
  description: string;
}

interface Store {
  items: Item[];
  loading: boolean;
  fetchItems: () => Promise<void>;
  addItem: (name: string, description: string) => Promise<void>;
  updateItem: (id: string, name: string, description: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  setItems: (items: Item[]) => void;
  updateItemOrder: (orderedItems: Item[]) => Promise<void>;
}

const useStore = create<Store>((set) => ({
  items: [],
  loading: false,
  /**
   * @description - GET request for all Items from DB
   * @dated - 12-06-2024
   * @author - Noel
   */
  fetchItems: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/items`
      );
      set({
        items: response.data.sort((a: Item, b: Item) => a.order - b.order),
      });

    } catch (error) {
      toast.error("Failed to fetch items.");
    } finally {
      set({ loading: false });
    }
  },

  /**
   * @description - ADD request for Items To DB
   * @dated - 12-06-2024
   * @author - Noel
   */
  addItem: async (name, description) => {
    set({ loading: true });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/items`,
        { name, description }
      );
      set((state) => ({ items: [...state.items, response.data] }));
      toast.success("Item added successfully.");
    } catch (error) {
      toast.error("Failed to add item.");
    } finally {
      set({ loading: false });
    }
  },

  /**
   * @description - Update request for ID's
   * @dated - 12-06-2024
   * @author - Noel
   */
  updateItem: async (id, name, description) => {
    set({ loading: true });
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/items/${id}`,
        { name, description }
      );
      set((state) => ({
        items: state.items.map((item) =>
          item._id === id ? response.data : item
        ),
      }));
      toast.success("Item updated successfully.");
    } catch (error) {
      toast.error("Failed to update item.");
    } finally {
      set({ loading: false });
    }
  },

  /**
   * @description - Delete request for ID's
   * @dated - 12-06-2024
   * @author - Noel
   */
  deleteItem: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/items/${id}`);
      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
      }));
      toast.success("Item deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete item.");
    } finally {
      set({ loading: false });
    }
  },

  /**
   * @description - Update for Last drag and drop
   * @dated - 12-06-2024
   * @author - Noel
   */
  updateItemOrder: async (orderedItems) => {
    set({ loading: true });
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/items/order`, {
        orderedItems,
      });
      set({ items: orderedItems });
      toast.success("Order updated successfully.");
    } catch (error) {
      toast.error("Failed to update order.");
    } finally {
      set({ loading: false });
    }
  },
  setItems: (items) => set({ items }),
}));

export default useStore;
