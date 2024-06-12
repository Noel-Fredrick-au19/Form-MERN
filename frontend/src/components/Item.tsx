import React, { useState } from "react";
import useStore from "../store/store";
import EditItem from "./EditItem";
import { Box, Button, Typography, Stack } from "@mui/material";
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
                  onClick={() => deleteItem(item._id)}
                  sx={{ bgcolor: "#ee6c4d" }}
                >
                  Delete
                </Button>
              </Stack>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Item;
