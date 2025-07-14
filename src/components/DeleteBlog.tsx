import {
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../api/axios";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [confirmationText, setConfirmationText] = useState("");
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/api/blogs/${blogId}`);
      return res.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data?.message || "Failed to delete blog.");
      } else {
        setFormError("Something went wrong wrong.");
      }
    },
    onSuccess: (data) => {
      setFeedback(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-user-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["get-all-blogs"] });
      setTimeout(() => navigate("/user/profile"), 1000);
    },
  });

  const handleDelete = () => {
    if (!confirmationText) {
      setFormError("Please enter the confirmation text.");
      return;
    }
    if (confirmationText !== "Please delete this blog") {
      setFormError("Incorrect confirmation text.");
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
          Delete Blog
        </Typography>

        <Typography variant="h5" color="text.secondary" mb={2}>
          Deleting this blog will hide it from public view. You can’t undo this
          action.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {formError && (
          <Alert severity="error" sx={{ fontSize: "1.4rem", mb: 2 }}>
            {formError}
          </Alert>
        )}
        {feedback && (
          <Alert severity="success" sx={{ fontSize: "1.4rem", mb: 2 }}>
            {feedback}
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
          Please delete this blog
        </Typography>

        <TextField
          fullWidth
          label="Type confirmation phrase"
          required
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
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
          sx={{ fontSize: "1.4rem", py: 1.2 }}
        >
          Delete Blog
        </Button>
      </Paper>
    </Stack>
  );
};

export default DeleteBlog;
