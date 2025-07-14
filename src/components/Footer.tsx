import { Box, Typography, Stack, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0d0d0d",
        color: "#ccc",
        py: 4,
        mt: 10,
        textAlign: "center",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h4" color="white" fontWeight={700}>
          BlogIt
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          fontSize={"1.5rem"}
        >
          <Link href="/dashboard" underline="hover" color="inherit">
            Blogs
          </Link>
          <Link href="/blogs/create" underline="hover" color="inherit">
            Create
          </Link>
          <Link href="/user/profile" underline="hover" color="inherit">
            Profile
          </Link>
        </Stack>

        <Typography variant="h5" color="gray">
          © {new Date().getFullYear()} BlogIt. All rights reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
