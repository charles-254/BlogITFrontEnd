import { Box } from "@mui/material";
import SpecificBlog from "../components/SpecificBlog";
import Footer from "../components/Footer";

function Blog() {
  return (
    <>
      <Box mt={"5rem"}>
        <SpecificBlog />
      </Box>
      <Footer />
    </>
  );
}

export default Blog;
