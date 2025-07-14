import {
  Stack,
  Typography,
  Avatar,
  Button,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Tooltip,
  CardActions,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import dayjs from "dayjs";
import { IoMailOutline } from "react-icons/io5";
import { PiGreaterThanBold } from "react-icons/pi";
import { PiHandsClappingThin } from "react-icons/pi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import useUser from "../store/UserStore";

function UserProfileDetails() {
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
      createdAt: string;
    };
  };

  const { username } = useParams();
  const { user } = useUser();
  const [following, setFollowing] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const handleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((blogId) => blogId !== id)
        : [...prev, id],
    );
  };

  const { data } = useQuery({
    queryKey: ["get-userSpecific-blogs", username],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/user/${username}`);
      return response.data;
    },
  });
  function handleFollow() {
    setFollowing(!following);
  }
  if (!data || !data.userBlogs || data.userBlogs.length === 0) {
    return (
      <Typography variant="h4" sx={{ m: 4 }}>
        No user blogs found or user does not exist.
      </Typography>
    );
  }
  const userInfo = data.userBlogs[0].user;
  const blogCount = data.userBlogs.length;

  return (
    <Stack spacing={4} sx={{ px: 4, py: 6 }}>
      <Stack direction="row" spacing={4} alignItems="center">
        {userInfo.profileImageUrl ? (
          <Avatar
            src={userInfo.profileImageUrl}
            sx={{ width: 100, height: 100 }}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              width: 100,
              height: 100,
              fontSize: "2.5rem",
            }}
          >
            {userInfo.firstName[0].toUpperCase()}
            {userInfo.lastName[0].toUpperCase()}
          </Avatar>
        )}

        <Stack>
          <Typography variant="h3" fontWeight={700}>
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            @{userInfo.username}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h5"
            display={"flex"}
            alignItems={"center"}
            gap={".4rem"}
          >
            <IoMailOutline
              style={{ fontSize: "2.3rem", color: "rgb(156, 156, 156)" }}
            />
            <a
              href={`mailto:${userInfo.email}`}
              style={{ color: "#2196f3", textDecoration: "none" }}
            >
              {userInfo.email}
            </a>
          </Typography>
          <Typography variant="h5">{blogCount} blog(s) published</Typography>
        </Stack>

        <Stack spacing={1}>
          <Chip
            label="213 followers"
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: 25,
              height: "3rem",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          />
          <Chip
            label="15 following"
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: 25,
              height: "3rem",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5">
            BlogIt member since{" "}
            {dayjs(userInfo.createdAt).format("DD MMMM YYYY")}
          </Typography>
          <Button
            variant="outlined"
            sx={{ borderRadius: 25, height: "3rem", width: "fit-content" }}
            onClick={handleFollow}
          >
            {following ? "following" : "follow"}
          </Button>
        </Stack>
      </Stack>

      <Divider />
      <Box>
        <Stack
          flexWrap={"wrap"}
          direction={"row"}
          justifyContent={"center"}
          gap={2}
        >
          {data.userBlogs.map((blog: Blog) => {
            const isOwner = user?.username === blog.user.username;
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
                    variant="h5"
                    fontSize={"1.65rem"}
                    textTransform={"capitalize"}
                  >
                    {blog.title.length > 85
                      ? blog.title.slice(0, 85) + "  ..."
                      : blog.title}
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
      </Box>
    </Stack>
  );
}

export default UserProfileDetails;
