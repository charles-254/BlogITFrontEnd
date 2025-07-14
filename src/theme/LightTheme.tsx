import { createTheme } from "@mui/material";

export const LightMode = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00695f" },
    secondary: { main: "#6a1b9a" },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#111111",
      secondary: "#555555",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "capitalize",
          fontSize: "1.3rem",
          fontWeight: 700,
          padding: "1rem 2.2rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});
