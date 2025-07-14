import {
  Typography,
  Stack,
  Alert,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Drawer,
  Box,
  IconButton,
  Badge,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import axios from "axios";
import useUser from "../store/UserStore";
import { CiEdit } from "react-icons/ci";
import { TbMathGreater } from "react-icons/tb";
import { MdOutlineDrafts } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const UserBlogs = () => {
  type Blog = {
    id: string;
    title: string;
    synopsis: string;
    content: string;
    imageUrl: string;
  };
  const { user, setUser } = useUser();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

 const uploadImage = async () => {
  if (!imageFile) return;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "blogimages"); 
  formData.append("cloud_name", "dofekmtxb");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dofekmtxb/image/upload",
      formData
    );

    const uploadedImageUrl = response.data.secure_url;

    const newUserInfo = {
      ...user,
      profileImageUrl: uploadedImageUrl,
    };

    setUser(newUserInfo as any);
    setFormError("");
    setSuccessMessage("Image uploaded successfully.");
  } catch (err: any) {
    setFormError("Failed to upload image. Try again.");
    console.error(err);
  } finally {
    setDrawerOpen(false);
  }
};


  const { data } = useQuery({
    queryKey: ["get-user-blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/user/blogs");
      return response.data;
    },
  });

  return (
    <Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-evenly"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        my={"3rem"}
        px={{ xs: 2, md: 4 }}
      >
        <Stack direction={"row"} spacing={"2rem"}>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <Badge
              badgeContent={4}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "1.2rem",
                },
              }}
            >
              <MdOutlineDrafts
                style={{ fontSize: "3rem", color: "rgb(156, 156, 156)" }}
              />
            </Badge>
            <Typography variant="h5">Drafts</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <Badge
              badgeContent={117}
              max={99}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "1.2rem",
                },
              }}
            >
              <CiCircleCheck
                style={{ fontSize: "3rem", color: "rgb(156, 156, 156)" }}
              />
            </Badge>
            <Typography variant="h5">Published</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <Badge
              badgeContent={57}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "1.2rem",
                },
              }}
            >
              <FaBookmark
                style={{ fontSize: "2.5rem", color: "rgb(156, 156, 156)" }}
              />
            </Badge>
            <Typography variant="h5">Bookmarks</Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
            <Badge
              badgeContent={1001}
              max={999}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "1.2rem",
                },
              }}
            >
              <CiMail
                style={{ fontSize: "2.5rem", color: "rgb(156, 156, 156)" }}
              />
            </Badge>
            <Typography variant="h5">Inbox</Typography>
          </Box>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ mt: { xs: 2, md: 0 } }}
        >
          <Button
            variant="outlined"
            color="primary"
            href="/user/account"
            sx={{ fontWeight: 600, fontSize: "1.2rem", px: 3 }}
          >
            View Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenDrawer}
            sx={{ fontWeight: 600, fontSize: "1.2rem", px: 3 }}
          >
            Upload profile image
          </Button>
        </Stack>
      </Stack>
      <Typography
        variant="h2"
        fontWeight={700}
        color="primary.main"
        gutterBottom
        sx={{ fontSize: { xs: "2.4rem", md: "3rem", alignSelf: "center" } }}
      >
        Your Writing Space
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{ fontSize: "1.6rem", maxWidth: "60%", alignSelf: "center" }}
      >
        Manage your drafts, update profile, or share your latest thoughts.
      </Typography>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        mt={"2rem"}
        mb={"8rem"}
        justifyContent={"center"}
        px={"1rem"}
      >
        {data &&
          data.userBlogs.map((blog: Blog) => (
            <Card sx={{ width: 400, bgcolor: "transparent" }} key={blog.id}>
              <CardMedia
                component="img"
                height="200"
                image={blog.imageUrl}
                alt={blog.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  textTransform={"capitalize"}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {blog.synopsis.length > 100
                    ? blog.synopsis.slice(0, 100) + "  ..."
                    : blog.synopsis}
                </Typography>
              </CardContent>

              <CardActions sx={{ mb: "1rem" }}>
                <Button
                  size="small"
                  color="primary"
                  href={`/blogs/edit/${blog.id}`}
                  endIcon={<CiEdit />}
                >
                  Edit
                </Button>

                <Button
                  color="secondary"
                  endIcon={<TbMathGreater />}
                  href={`/blogs/${blog.id}`}
                >
                  read more
                </Button>
                <Button
                  size="small"
                  color="error"
                  href={`/blogs/delete/${blog.id}`}
                  endIcon={<MdDeleteOutline />}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Stack>
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 350, p: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {formError && (
              <Alert severity="error" sx={{ fontSize: "1.6rem" }}>
                {formError}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ fontSize: "1.6rem" }}>
                {successMessage}
              </Alert>
            )}
            <Typography variant="h5">Upload Profile Image</Typography>
            <IconButton onClick={handleCloseDrawer} color="error">
              <CloseIcon sx={{ fontSize: "2rem", fontWeight: 900 }} />
            </IconButton>
          </Stack>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: "100%", marginTop: 10, borderRadius: 8 }}
            />
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={uploadImage}
            sx={{ mt: "1rem" }}
          >
            upload profile image
          </Button>
        </Box>
      </Drawer>
    </Stack>
  );
};

export default UserBlogs;
