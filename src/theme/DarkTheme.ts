import { createTheme } from "@mui/material";

export const DarkMode = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00bfa6" },
    secondary: { main: "#9d4edd" },
    background: {
      default: "#000000",
      paper: "#3d3d3da0",
    },
    text: {
      primary: "#e4e4e7",
      secondary: "#9ca3af",
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
          backgroundColor: "#16161a",
          border: ".1rem solid #2c2c2e",
          borderRadius: 8,
          boxShadow: "0rem .4rem 2rem rgba(0, 0, 0, 0.5)",
        },
      },
    },
  },
});
