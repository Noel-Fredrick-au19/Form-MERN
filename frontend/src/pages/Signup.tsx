import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(username, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen">
      <Box className="w-full max-w-md p-4 border rounded shadow-lg">
        <Typography variant="h4" className="mb-4">
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
