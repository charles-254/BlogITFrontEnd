import { Box } from "@mui/material";
import AllBlogsListing from "../components/AllBlogsListing";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Box my={8}>
        <AllBlogsListing />
      </Box>
      <Footer />
    </>
  );
}

export default Dashboard;
