import {
  Stack,
  TextField,
  Typography,
  Button,
  Alert,
  TextareaAutosize,
  Divider,
  Box,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function EditBlog() {
  const [formError, setFormError] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { blogId } = useParams();

  const { data } = useQuery({
    queryKey: ["get-specific-blog"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${blogId}`);
      return response.data;
    },
  });
  useEffect(() => {
    if (data && data.blog) {
      setTitle(data.blog.title);
      setSynopsis(data.blog.synopsis);
      setContent(data.blog.content);
      setPreviewUrl(data.blog.imageUrl);
    }
  }, [data]);

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
    setUploading(true);
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "blogimages");
    formData.append("cloud_name", "dofekmtxb");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dofekmtxb/image/upload",
        formData,
      );
      console.log(res.data.secure_url);
      return res.data.secure_url;
    } catch (err: any) {
      setFormError("Image upload failed. Try again.");
      return null;
    } finally {
      setUploading(false);
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
      const res = await axiosInstance.patch(`/api/blogs/${blogId}`, newBlog);
      return res.data;
    },
    onError: (err: any) => {
      setFormError(err?.response?.data?.message || "Error occurred");
    },
    onSuccess: () => {
      setSuccessMessage("Blog Updated successfully.");
      clearForm();
    },
  });

  const handleUpdateBlog = async () => {
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
          fontWeight={800}
          color="primary.main"
          gutterBottom
          sx={{ fontSize: { xs: "2.8rem", md: "3.8rem" } }}
          alignItems={"center"}
        >
          Revise Your Story
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            mt: 1,
          }}
        >
          Whether you're refining a sentence or rewriting entire sections,
          editing gives your blog the polish it deserves. Take a moment to
          revisit your ideas, enhance flow, and ensure your message resonates
          clearly with your readers.
        </Typography>
      </Box>
      <Divider variant="middle" sx={{ mb: 4 }} />
      <Stack
        justifyItems={"center"}
        component={"form"}
        spacing={2}
        width={"40%"}
        sx={{ p: 4, borderRadius: "15px" }}
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
            backgroundColor: "transparent",
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
            onClick={handleUpdateBlog}
            loading={isPending || uploading}
          >
            Update blog
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
              p: 4,
              m: "2rem",
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

export default EditBlog;
