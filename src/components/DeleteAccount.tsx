import {
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";
import useUser from "../store/UserStore";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
  const [confirmStatement, setConfirmStatement] = useState("");
  const [formError, setFormError] = useState("");
  const { logoutUser } = useUser();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-user-account"],
    mutationFn: async () => {
      const response = await axiosInstance.delete("/api/user/delete");
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(
          error.response?.data.message || "Failed to delete account.",
        );
      }
    },
    onSuccess: () => {
      setSuccessMessage("Account deleted succesfully");
      localStorage.clear();
      logoutUser();
      setTimeout(() => navigate("/login"), 3000);
    },
  });

  const handleDelete = () => {
    if (!confirmStatement) {
      setFormError("Please enter the confirmation statement.");
      return;
    }
    if (confirmStatement !== "Please delete my account") {
      setFormError("Please enter the correct statement.");
      return;
    }
    setFormError("");
    mutate();
  };

  return (
    <Stack px={{ xs: 2, md: 10 }} py={6} minHeight="100vh" alignItems="center">
      <Paper
        elevation={3}
        sx={{ p: 5, borderRadius: 3, width: "100%", maxWidth: 600 }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="error.main"
          gutterBottom
        >
          Delete Account
        </Typography>

        <Typography variant="h5" color="text.secondary" mb={2}>
          This action is permanent and will delete all your data. Please type
          the confirmation phrase below to proceed.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {formError && (
          <Alert severity="error" sx={{ fontSize: "1.5rem", mb: 2 }}>
            {formError}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ fontSize: "1.5rem", mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Typography variant="h5" gutterBottom>
          Confirmation phrase:
        </Typography>
        <Typography
          variant="h5"
          fontWeight={600}
          fontStyle="italic"
          sx={{ mb: 2 }}
        >
          Please delete my account
        </Typography>

        <TextField
          fullWidth
          label="Type confirmation phrase"
          required
          value={confirmStatement}
          onChange={(e) => setConfirmStatement(e.target.value)}
          InputProps={{ style: { fontSize: "1.6rem" } }}
          InputLabelProps={{ style: { fontSize: "1.4rem" } }}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          color="error"
          fullWidth
          loading={isPending}
          onClick={handleDelete}
        >
          Delete My Account
        </Button>
      </Paper>
    </Stack>
  );
}

export default DeleteAccount;
