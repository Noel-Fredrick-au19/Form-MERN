import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  Box,
  Button,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { GridLoader } from "react-spinners";
import useStore from "../store/store";
import Item from "../components/Item";
import AddItemSidebar from "../components/AddItemSidebar";

const AppContent: React.FC = () => {
  const { items, fetchItems, setItems, updateItemOrder, loading } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 4;

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(reorderedItems);
    await updateItemOrder(reorderedItems);
  };

  const handleAddClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box className="container mx-auto p-4">
      <Box
        className="bg-gray-100 p-4 rounded-md shadow-md"
        sx={{ padding: "20px", paddingTop: "35px" }}
      >
        <Box
          className="bg-[#3d5a80] h-6"
          sx={{ width: "100%", height: "60px", position: "relative" }}
        >
          <Box className="flex items-center mb-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{
                marginLeft: "16px",
                marginTop: "10px",
                marginRight: "30px",
                bgcolor: "#1982c4",
              }}
            >
              Add
            </Button>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "white",
                  width: "100%",
                  borderRadius: "4px",
                  height: "40px",
                  marginTop: "10px",
                  marginLeft: "30px",
                },
              }}
            />
          </Box>
        </Box>

        {loading ? (
          <Box className="flex justify-center items-center h-full">
            <GridLoader color="#36D7B7" />
          </Box>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {paginatedItems.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 bg-white rounded shadow"
                        >
                          <Item item={item} />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <Box className="flex justify-end mt-4">
          <Pagination
            count={Math.ceil(filteredItems.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
      <AddItemSidebar open={isSidebarOpen} onClose={handleCloseSidebar} />
    </Box>
  );
};

export default AppContent;
