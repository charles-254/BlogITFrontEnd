import { Box, Typography, Button, Stack } from "@mui/material";

const Hero = () => (
  <Box
    sx={{
      backgroundImage: 'url("/images/hero.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      position: "relative",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        textAlign: "center",
        pointerEvents: "auto",
      }}
    >
      <Typography
        variant="h1"
        color="secondary"
        sx={{
          fontWeight: 700,
          textTransform: "capitalize",
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: "8rem",
        }}
      >
        unleash you voice,
      </Typography>
      <Typography
        variant="h1"
        color="secondary"
        sx={{
          fontWeight: 700,
          textTransform: "capitalize",
          fontFamily: '"Noto Sans", sans-serif',
          fontSize: "7rem",
        }}
      >
        one blog at a time
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{ maxWidth: "50%", fontSize: "2rem", mt: 2 }}
      >
        Discover a platform where every story matters.
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{ maxWidth: "50%", fontSize: "2rem", mb: 2 }}
      >
        Create, Publish and Connect.
      </Typography>
      <Stack direction="row" spacing={3}>
        <Button
          href="/login"
          variant="contained"
          sx={{ fontSize: "1.3rem", fontWeight: 700 }}
        >
          {" "}
          Login
        </Button>
        <Button
          href="/register"
          variant="contained"
          color="secondary"
          sx={{ fontSize: "1.3rem", fontWeight: 700 }}
        >
          Get started
        </Button>
      </Stack>
    </Box>
  </Box>
);
export default Hero;
