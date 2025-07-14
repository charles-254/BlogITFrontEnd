import {
  Stack,
  TextField,
  Typography,
  Button,
  Alert,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import axiosInstance from "../api/axios";
import { useMutation } from "@tanstack/react-query";
import useUser from "../store/UserStore";
import { useState } from "react";

const AccountDetail = () => {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState(user?.username);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [formError, setFormError] = useState("");
  const [feedback, setFeedback] = useState("");

  type User = {
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    email: string | undefined;
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-user-details"],
    mutationFn: async (updatedUserInfo: User) => {
      const response = await axiosInstance.patch("/api/user/", updatedUserInfo);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message);
      } else setFormError("Something went wrong.");
    },
    onSuccess: (data) => {
      setFormError("");
      setFeedback(data.message);

      const { firstName, lastName, username, email } = data.updatedUserDetails;
      const profileImageUrl = user?.profileImageUrl;

      setFirstName(firstName);
      setLastName(lastName);
      setUsername(username);
      setEmail(email);

      setUser({ firstName, lastName, username, email, profileImageUrl });
    },
  });

  function handleUpdateUserInfo() {
    mutate({ firstName, lastName, username, email });
  }

  return (
    <Stack spacing={4} px={{ xs: 2, md: 10 }} py={5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Account Settings
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="secondary"
            href="/user/account/change-password"
          >
            Change Password
          </Button>
          <Button variant="outlined" color="error" href="/user/account/delete">
            Delete Account
          </Button>
        </Stack>
      </Stack>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: "70%" }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Personal Information
        </Typography>
        <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
          Update your profile details. Make sure the information is accurate. It
          helps others connect with your content.
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
            label="First Name"
            required
            InputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.6rem" } }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            required
            InputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.6rem" } }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Username"
            required
            InputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.6rem" } }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email Address"
            type="email"
            required
            InputProps={{ style: { fontSize: "1.6rem" } }}
            InputLabelProps={{ style: { fontSize: "1.6rem" } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Box textAlign="right" mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateUserInfo}
              disabled={isPending}
            >
              Update Details
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default AccountDetail;
