import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: "rgb(3, 125, 213)" }} size={80} />
      <Typography variant="h4" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
