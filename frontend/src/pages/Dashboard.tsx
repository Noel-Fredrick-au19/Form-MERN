import React from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import AppContent from "../components/AppContent";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Box className="p-4">
      {/* <Typography variant="h4">Dashboard</Typography> */}
      <Typography variant="subtitle1">{user?.username}</Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
      <AppContent />
    </Box>
  );
};

export default Dashboard;
