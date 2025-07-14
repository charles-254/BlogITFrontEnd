import {
  Stack,
  TextField,
  Typography,
  Button,
  Alert,
  TextareaAutosize,
  InputLabel,
  Box,
  Divider,
  Chip,
  Tooltip,
  Link,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownIcon from "@mui/icons-material/Code";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
function CreateBlog() {
  const [formError, setFormError] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);
  function clearForm() {
    setTitle("");
    setContent("");
    setSynopsis("");
    setPreviewUrl("");
  }
const uploadImageToCloudinary = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "blogimages");
    formData.append("cloud_name", "dofekmtxb"); 

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dofekmtxb/image/upload",
        formData
      );
      console.log(res.data.secure_url)
      return res.data.secure_url; 
    } catch (err: any) {
      setFormError("Image upload failed. Try again.");
      return null;
    }
  };

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async (newBlog: {
      title: string;
      synopsis: string;
      content: string;
      imageUrl: string;
    }) => {
      const res = await axiosInstance.post("/api/blogs", newBlog);
      return res.data;
    },
    onError: (err: any) => {
      setFormError(err?.response?.data?.message || "Error occurred");
    },
    onSuccess: () => {
      setSuccessMessage("Blog created successfully.");
      clearForm();
    },
  });

  const handleCreateBlog = async () => {
    setFormError("");
    const uploadedUrl = await uploadImageToCloudinary();
    if (!uploadedUrl) return;
    const blogData = { title, synopsis, content, imageUrl: uploadedUrl };
    mutate(blogData);
  };



  return (
    <Stack>
      <Box sx={{ my: 5, justifyItems: "center", textAlign: "center" }}>
        <Typography
          variant="h3"
          fontWeight={700}
          color="primary.main"
          gutterBottom
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
          }}
        >
          Share Your Voice with the World 🌍
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: "60%",
            mb: 2,
            fontSize: { xs: "1.2rem", md: "1.5rem" },
          }}
        >
          Begin your blogging journey here. Craft meaningful stories, tutorials,
          or journal entries using a powerful and flexible editor that supports{" "}
          <strong>Markdown</strong>. Make it bold, make it yours.
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip
            icon={<MarkdownIcon sx={{ fontSize: "2.5rem" }} />}
            label="Markdown Supported"
            color="secondary"
            sx={{ fontSize: "1.5rem", px: 1.5 }}
          />
          <Tooltip
            title="Need help with markdown?"
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: "1.4rem",
                  backgroundColor: "rgba(50, 50, 50, 0.7);",
                  color: "#fff",
                  borderRadius: ".8rem",
                  padding: ".3rem 1rem",
                },
              },
            }}
          >
            <Link
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_blank"
              underline="hover"
              sx={{ display: "flex", alignItems: "center", fontSize: "4rem" }}
            >
              <HelpOutlineIcon sx={{ fontSize: "2.5rem", ml: 0.5 }} />
            </Link>
          </Tooltip>
        </Stack>
      </Box>
      <Divider variant="middle" sx={{ mb: 4 }} />
      <Stack
        justifyItems={"center"}
        component={"form"}
        spacing={2}
        width={"40%"}
        sx={{ p: 4, borderRadius: "15px", bgcolor: "rgba(0, 0, 0, 0.67)" }}
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
        <TextField
          label="Blog Title"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Blog Synopsis"
          required
          InputProps={{ style: { fontSize: "1.8rem" } }}
          InputLabelProps={{ style: { fontSize: "1.6rem" } }}
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />

        <TextareaAutosize
          placeholder="Enter Blog Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            fontSize: "1.6rem",
            padding: "1rem",
            backgroundColor: "inherit",
            color: "inherit",
            borderRadius: "8px",
          }}
        />
        <InputLabel sx={{ mb: 1, fontSize: "1.5rem" }}>
          Upload Cover Image
        </InputLabel>
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

        <Stack direction={"row"} spacing={"2rem"}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateBlog}
            disabled={isPending}
          >
            Publish blog
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? "Hide Preview" : "Preview Markdown"}
          </Button>
        </Stack>
      </Stack>
      <Box>
        {previewMode && (
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              backgroundColor: "rgb(74, 74, 74)",
              mx: "2rem",
            }}
          >
            <Typography variant="h3" fontWeight={600} mb={2}>
              Markdown Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack fontSize={"1.6rem"}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "Start typing your blog content in markdown..."}
              </ReactMarkdown>
            </Stack>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

export default CreateBlog;
