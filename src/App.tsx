import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { DarkMode } from "./theme/DarkTheme";
import { LightMode } from "./theme/LightTheme";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import UpdateBlog from "./pages/UpdateBlog";
import CreateNewBlog from "./pages/CreateNewBlog";
import AccountProfile from "./pages/AccountProfile";
import UserProfile from "./pages/UserProfile";
import Protected from "./components/Protected";
import UpdatePassword from "./components/UpdatePassword";
import DeleteAccount from "./components/DeleteAccount";
import DeleteBlog from "./components/DeleteBlog";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";

import "./App.css";

const client = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const theme = isDarkMode ? DarkMode : LightMode;

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {shouldShowNavbar && (
          <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/blogs/create"
            element={
              <Protected>
                <CreateNewBlog />
              </Protected>
            }
          />
          <Route
            path="/user/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/user/account"
            element={
              <Protected>
                <AccountProfile />
              </Protected>
            }
          />
          <Route
            path="/user/account/change-password"
            element={
              <Protected>
                <UpdatePassword />
              </Protected>
            }
          />
          <Route
            path="/user/account/delete"
            element={
              <Protected>
                <DeleteAccount />
              </Protected>
            }
          />
          <Route
            path="/blogs/:blogId"
            element={
              <Protected>
                <Blog />
              </Protected>
            }
          />
          <Route
            path="/blogs/edit/:blogId"
            element={
              <Protected>
                <UpdateBlog />
              </Protected>
            }
          />
          <Route
            path="/blogs/delete/:blogId"
            element={
              <Protected>
                <DeleteBlog />
              </Protected>
            }
          />
          <Route
            path="/blogs/user/:username"
            element={
              <Protected>
                <UserProfile />
              </Protected>
            }
          />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
