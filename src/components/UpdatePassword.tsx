import {
  Stack,
  TextField,
  Button,
  Alert,
  Typography,
  Divider,
  Paper,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  type Passwords = {
    currentPassword: string;
    newPassword: string;
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-user-password"],
    mutationFn: async (passwordsInfo: Passwords) => {
      const response = await axiosInstance.patch(
        "/api/user/password",
        passwordsInfo,
      );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message || "Password update failed.");
      } else {
        setFormError("Something went wrong.");
      }
    },
    onSuccess: (data) => {
      setFormError("");
      setFeedback(data.message);
      setCurrentPassword("");
      setNewPassword("");
    },
  });

  function handleUpdateUserPassword() {
    setFormError("");
    setFeedback("");
    mutate({ currentPassword, newPassword });
  }

  return (
    <Stack px={{ xs: 2, md: 10 }} py={6} minHeight="100vh" alignItems="center">
      <Paper
        elevation={3}
        sx={{ p: 5, borderRadius: 3, width: "100%", maxWidth: 550 }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary.main"
          gutterBottom
        >
          Update Your Password
        </Typography>

        <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
          Stay secure by updating your password regularly. Make sure your new
          password is strong and memorable.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={2}>
          {formError && (
            <Alert severity="error" sx={{ fontSize: "1.4rem" }}>
              {formError}
            </Alert>
          )}
          {feedback && (
            <Alert severity="success" sx={{ fontSize: "1.4rem" }}>
              {feedback}
            </Alert>
          )}

          <TextField
            label="Current Password"
            required
            type={showCurrentPassword ? "text" : "password"}
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              style: { fontSize: "1.6rem" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    edge="start"
                  >
                    {showCurrentPassword ? (
                      <VisibilityOff sx={{ fontSize: "2.4rem" }} />
                    ) : (
                      <Visibility sx={{ fontSize: "2.4rem" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { fontSize: "1.4rem" } }}
          />

          <TextField
            label="New Password"
            required
            type={showNewPassword ? "text" : "password"}
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              style: { fontSize: "1.6rem" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    edge="start"
                  >
                    {showNewPassword ? (
                      <VisibilityOff sx={{ fontSize: "2.4rem" }} />
                    ) : (
                      <Visibility sx={{ fontSize: "2.4rem" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ style: { fontSize: "1.4rem" } }}
          />

          <Box textAlign="right" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              disabled={isPending}
              onClick={handleUpdateUserPassword}
            >
              Change Password
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default UpdatePassword;
