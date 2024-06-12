import React, { useState } from "react";
import { Drawer, Box, TextField, Button, Stack } from "@mui/material";
import useStore from "../store/store";
import { GridLoader } from "react-spinners";

interface AddItemSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AddItemSidebar: React.FC<AddItemSidebarProps> = ({ open, onClose }) => {
  const { addItem, loading } = useStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveClick = async () => {
    if (name && description) {
      await addItem(name, description);
      setName("");
      setDescription("");
      onClose();
    }
  };

  const handleCancelClick = () => {
    setName("");
    setDescription("");
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: "20px" }}>
        <h2>Add Item</h2>
        {loading ? (
          <Box className="flex justify-center items-center h-full">
            <GridLoader color="#36D7B7" />
          </Box>
        ) : (
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSaveClick}>
                Save
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Drawer>
  );
};

export default AddItemSidebar;
