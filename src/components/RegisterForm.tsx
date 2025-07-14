import {
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../api/axios";

function RegisterForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  type User = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axiosInstance.post("/api/auth/register", newUser);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message);
      }
    },
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleSignUp() {
    if (password !== confirmPassword) {
      setFormError("Passwords must match!");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    setFormError("");
    mutate(newUser);
  }

  return (
    <Stack
      sx={{
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        backgroundImage: 'url("/images/auth.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        bgcolor: "rgba(0, 0, 0, 0.57)",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        color="secondary.main"
        fontWeight={700}
      >
        Create Account
      </Typography>

      <Stack
        component={"form"}
        spacing={2}
        width={"40%"}
        sx={{ p: 4, borderRadius: "15px", bgcolor: "rgba(0, 0, 0, 0.67)" }}
      >
        {formError && (
          <Alert severity="error" sx={{ fontSize: "1.6rem" }}>
            {formError}
          </Alert>
        )}
        <TextField
          label="First Name"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Username"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          InputProps={{
            style: { fontSize: "1.8rem" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="start"
                  sx={{ fontSize: "2rem" }}
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ fontSize: "2.4rem" }} />
                  ) : (
                    <Visibility sx={{ fontSize: "2.4rem" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          required
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            style: { fontSize: "1.8rem" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="start"
                  sx={{ fontSize: "2rem" }}
                >
                  {showConfirmPassword ? (
                    <VisibilityOff sx={{ fontSize: "2.4rem" }} />
                  ) : (
                    <Visibility sx={{ fontSize: "2.4rem" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignUp}
          loading={isPending}
        >
          Register
        </Button>
        <Stack direction="row" spacing={2}>
          <Typography variant="h5">Already have an account?</Typography>
          <Link
            href="/login"
            underline="always"
            sx={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            Login
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RegisterForm;
