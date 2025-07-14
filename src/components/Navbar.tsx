import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Link,
  Avatar,
  IconButton,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import useUser from "../store/UserStore";
import { useNavigate } from "react-router-dom";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

type Props = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};
function Navbar({ isDarkMode, toggleTheme }: Props) {
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  function handleLogout() {
    localStorage.clear();
    logoutUser();
    navigate("/login");
  }
  if (user) {
    return (
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ mt: 2 }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "90%",
            border: "1px solid rgba(5, 183, 159, 0.52)",
            borderRadius: "12px",
            alignSelf: "center",
          }}
        >
          <Typography variant="h3" color="primary">
            BlogIt
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ alignItems: "center", fontSize: "1.3rem", fontWeight: 700 }}
          >
            <Link href="/dashboard">Blogs</Link>
            <Link href="/blogs/create">Create Blog</Link>
            <Link href="/user/profile">Profile</Link>
            <Button color="error" onClick={handleLogout}>
              Logout
            </Button>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: 700 }}>
              Welcome <Link href="/user/account">{user.username}</Link>
            </Typography>
            {user.profileImageUrl ? (
              <Avatar sx={{ height: 50, width: 50 }}>
                {" "}
                <img src={user.profileImageUrl} alt="" width={80} />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  fontSize: "2.2rem",
                  color: "white",
                }}
              >
                {user.firstName[0].toUpperCase()}
                {user.lastName[0].toUpperCase()}
              </Avatar>
            )}

            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? (
                <MdDarkMode style={{ fontSize: "2.4rem" }} />
              ) : (
                <MdLightMode style={{ fontSize: "2.4rem" }} />
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar color="transparent" elevation={0} sx={{ mt: 2 }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "90%",
            border: "1px solid rgba(5, 183, 159, 0.52)",
            borderRadius: "12px",
            alignSelf: "center",
          }}
        >
          <Typography variant="h3" color="primary">
            BlogIt
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button
              href="/login"
              variant="outlined"
              sx={{ fontSize: "1.3rem", fontWeight: 700 }}
            >
              Login
            </Button>
            <Button
              href="/register"
              variant="contained"
              color="secondary"
              sx={{ fontSize: "1.3rem", fontWeight: 700 }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
