import React, { useState } from "react";
import useStore from "../store/store";
import EditItem from "./EditItem";
import {
  Box,
  Button,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { GridLoader } from "react-spinners";

interface ItemProps {
  item: {
    _id: string;
    name: string;
    description: string;
  };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const { deleteItem, loading } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteItem(item._id);
    handleClose();
  };

  return (
    <Box className="item p-4 bg-white rounded shadow">
      {isEditing ? (
        <EditItem item={item} setIsEditing={setIsEditing} />
      ) : (
        <>
          {loading ? (
            <Box className="flex justify-center items-center h-full">
              <GridLoader color="#36D7B7" />
            </Box>
          ) : (
            <>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2">{item.description}</Typography>
              <Stack direction="row" spacing={2} mt={2}>
                <Button variant="outlined" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleClickOpen}
                  sx={{ bgcolor: "#ee6c4d" }}
                >
                  Delete
                </Button>
              </Stack>
            </>
          )}
        </>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <>
              Once the action is deleted, it cannot be changed. <br />
              Are you sure you want to delete the item?
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Item;
