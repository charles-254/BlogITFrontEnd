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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../store/UserStore";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm() {
  type UserCreds = {
    identifier: string;
    password: string;
  };

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const { setUser } = useUser();

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (userCreds: UserCreds) => {
      const response = await axiosInstance.post("/api/auth/login", userCreds);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message);
      }
    },
    onSuccess: (data) => {
      setUser(data.userInfo);
      const token = data.token;
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    },
  });

  function handleLogin() {
    const userCreds = { identifier, password };
    mutate(userCreds);
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
        color="primary.main"
        fontWeight={700}
      >
        Login
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
          label="Username OR Email"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={isPending}
        >
          Login
        </Button>

        <Stack direction="row" spacing={2}>
          <Typography variant="h5">Don't have an account?</Typography>
          <Link
            href="/register"
            underline="always"
            color="secondary"
            sx={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            Create Account
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LoginForm;
