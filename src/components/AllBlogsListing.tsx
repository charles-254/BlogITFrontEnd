import {
  Typography,
  Stack,
  Tooltip,
  Card,
  IconButton,
  CardMedia,
  CardActions,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../api/axios";
import dayjs from "dayjs";
import { PiGreaterThanBold } from "react-icons/pi";
import { PiHandsClappingThin } from "react-icons/pi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { TypeAnimation } from "react-type-animation";
import Loader from "./Loader";

import useUser from "../store/UserStore";

const AllBlogsListing = () => {
  type Blog = {
    id: string;
    title: string;
    synopsis: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    user: {
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profileImageUrl: string | null;
    };
  };
  const { user } = useUser();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const handleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((blogId) => blogId !== id)
        : [...prev, id],
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-all-blogs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/blogs");
      return response.data;
    },
  });
  return (
    <Stack>
      {isLoading && <Loader />}
      <Stack spacing={1} mb={4} textAlign="center">
        <Typography
          variant="h2"
          fontWeight={600}
          color="primary.main"
          textTransform={"capitalize"}
        >
          <TypeAnimation
            sequence={[
              "Fresh From the Writers.",
              2000,
              "",
              500,
              "Stories Worth Reading.",
              2000,
              "",
              500,
              "Write. Read. Repeat.",
              2000,
              "",
              500,
              "Thoughts from the Terminal.",
              2000,
              "",
              500,
              "Where Words Meet Purpose.",
              2000,
              "",
              500,
            ]}
            speed={40}
            repeat={Infinity}
            style={{
              fontSize: "3.5rem",
              color: "#00f5d4",
              display: "inline-block",
            }}
          />
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontSize: "1.6rem", maxWidth: "60%", alignSelf: "center" }}
        >
          Discover the most recent thoughts, stories, and ideas shared by our
          community.
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"center"}
      >
        {data &&
          data.allBlogs.map((blog: Blog) => {
            const isOwner = user?.username === blog.user.username;
            console.log(blog.user.profileImageUrl)
            return (
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
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    {blog.user.profileImageUrl ? (
                      <Avatar
                        sx={{ height: 35, width: 35 }}
                        src={blog.user.profileImageUrl}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          bgcolor: deepOrange[500],
                          fontSize: "2.2rem",
                          color: "white",
                          height: 35,
                          width: 35,
                        }}
                      >
                        {blog.user.firstName[0].toUpperCase()}
                        {blog.user.lastName[0].toUpperCase()}
                      </Avatar>
                    )}
                    <Stack direction={"row"} spacing={2}>
                      <Typography variant="h5">
                        {isOwner ? "By You" : blog.user.username}
                      </Typography>
                      <Typography variant="h5" mx={1}>
                        •
                      </Typography>
                      <Typography variant="h5">
                        {dayjs(blog.createdAt).format("DD MMMM YYYY")}
                      </Typography>
                      <Typography variant="h5" mx={1}>
                        •
                      </Typography>
                      <Typography variant="h5" mx={1}>
                        6 min read
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{ mb: "1rem", justifyContent: "space-between" }}
                >
                  <Button
                    size="small"
                    color="secondary"
                    href={`/blogs/${blog.id}`}
                    endIcon={<PiGreaterThanBold />}
                  >
                    read more
                  </Button>
                  <Stack direction={"row"} spacing={"1.5rem"}>
                    <Tooltip
                      title="219 Claps"
                      placement="top"
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
                        arrow: {
                          sx: {
                            color: "rgba(74, 74, 74, 0.702)",
                          },
                        },
                      }}
                      arrow
                    >
                      <IconButton sx={{ fontSize: "2.3rem" }}>
                        <PiHandsClappingThin
                          style={{ color: "rgb(156, 156, 156)" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="917 responds"
                      placement="top"
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
                        arrow: {
                          sx: {
                            color: "rgba(74, 74, 74, 0.702)",
                          },
                        },
                      }}
                      arrow
                    >
                      <IconButton sx={{ fontSize: "2.3rem" }}>
                        <AiOutlineMessage
                          style={{ color: "rgb(156, 156, 156)" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={isOwner ? "edit" : "save"}
                      placement="top"
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
                        arrow: {
                          sx: {
                            color: "rgba(74, 74, 74, 0.702)",
                          },
                        },
                      }}
                      arrow
                    >
                      <IconButton
                        sx={{ fontSize: "2.3rem" }}
                        onClick={() => handleSave(blog.id)}
                      >
                        {isOwner ? (
                          <CiEdit style={{ color: "rgb(156, 156, 156)" }} />
                        ) : savedIds.includes(blog.id) ? (
                          <FaBookmark style={{ color: "rgb(236, 236, 236)" }} />
                        ) : (
                          <MdOutlineBookmarkAdd
                            style={{ color: "rgb(156, 156, 156)" }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardActions>
              </Card>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default AllBlogsListing;
