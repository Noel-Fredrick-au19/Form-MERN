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
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSaveClick = async () => {
    let valid = true;

    if (!name) {
      setNameError("Name is required.");
      valid = false;
    } else {
      setNameError("");
    }

    if (!description) {
      setDescriptionError("Description is required.");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (valid) {
      await addItem(name, description);
      setName("");
      setDescription("");
      onClose();
    }
  };

  const handleCancelClick = () => {
    setName("");
    setDescription("");
    setNameError("");
    setDescriptionError("");
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 300, padding: "20px" }}>
        <h2 className="mb-4">Add Item</h2>
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
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              error={!!descriptionError}
              helperText={descriptionError}
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
