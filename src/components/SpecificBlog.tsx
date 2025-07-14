import {
  Stack,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import axiosInstance from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../store/UserStore";
import { deepOrange } from "@mui/material/colors";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";
import { PiHandsClappingThin } from "react-icons/pi";
import { FaHandsClapping } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import { IoIosMore } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { LuCirclePlay } from "react-icons/lu";
import { LuShare } from "react-icons/lu";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import remarkBreaks from "remark-breaks";

function SpecificBlog() {
  const { blogId } = useParams();
  const { user } = useUser();
  const [saved, setSaved] = useState(false);
  const [clapped, setClapped] = useState(false);
  const [following, setFollowing] = useState(false);
  const navigate = useNavigate();

  function handleSave() {
    setSaved(!saved);
  }
  function handleClap() {
    setClapped(!clapped);
  }
  function handleFollow() {
    setFollowing(!following);
  }
  function handleEdit() {
    navigate(`/blogs/edit/${blogId}`);
  }
  function handleDelete() {
    navigate(`/blogs/delete/${blogId}`);
  }

  const { data } = useQuery({
    queryKey: ["get-specific-blog"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${blogId}`);
      return response.data;
    },
  });

  let isOwner = false;
  if (data?.blog && user?.username === data.blog.user.username) {
    isOwner = true;
  }

  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <Stack width={"50%"}>
        {data && (
          <Stack component={"div"}>
            <Stack component={"div"} mb={"2rem"}>
              <Typography
                variant="h1"
                gutterBottom
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"5rem"}
              >
                {data.blog.title}
              </Typography>
              <Stack
                component={"div"}
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                mt={"1rem"}
              >
                {data.blog.user.profileImageUrl ? (
                  <Avatar
                    sx={{ height: 35, width: 35 }}
                    src={data.blog.user.profileImageUrl}
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
                    {data.blog.user.firstName[0].toUpperCase()}
                    {data.blog.user.lastName[0].toUpperCase()}
                  </Avatar>
                )}
                <Typography variant="h5">{data.blog.user.username}</Typography>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 25, height: "3rem" }}
                  onClick={handleFollow}
                >
                  {following ? "following" : "follow"}
                </Button>
                <Typography variant="h5">6 min read</Typography>
                <Typography variant="h5" mx={1}>
                  •
                </Typography>
                <Typography variant="h5">
                  {dayjs(data.blog.createdAt).format("DD MMMM YYYY")}
                </Typography>
              </Stack>
            </Stack>
            <Divider></Divider>
            <Stack my={".5rem"}>
              <Stack
                component={"div"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} spacing={4}>
                  <Stack
                    component={"div"}
                    direction={"row"}
                    alignItems={"center"}
                  >
                    <Tooltip
                      title="Clap"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1.4rem",
                            backgroundColor: "rgba(50, 50, 50, 0.7);",
                            color: "#fff",
                            borderRadius: ".8rem",
                            padding: ".3rem 1rem",
                            boxShadow: 3,
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
                        onClick={handleClap}
                      >
                        {clapped ? (
                          <FaHandsClapping />
                        ) : (
                          <PiHandsClappingThin
                            style={{ color: "rgb(156, 156, 156)" }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Typography variant="h6">219</Typography>
                  </Stack>
                  <Stack
                    component={"div"}
                    direction={"row"}
                    alignItems={"center"}
                  >
                    <Tooltip
                      title="Respond"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1.4rem",
                            backgroundColor: "rgba(50, 50, 50, 0.7);",
                            color: "#fff",
                            borderRadius: ".8rem",
                            padding: ".3rem 1rem",
                            boxShadow: 3,
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
                    <Typography variant="h6">917</Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  color={"text.secondary"}
                  spacing={"2rem"}
                >
                  <Tooltip
                    title={isOwner ? "Edit" : "save"}
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontSize: "1.4rem",
                          backgroundColor: "rgba(50, 50, 50, 0.7);",
                          color: "#fff",
                          borderRadius: ".8rem",
                          padding: ".3rem 1rem",
                          boxShadow: 3,
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
                      onClick={isOwner ? handleEdit : handleSave}
                    >
                      {isOwner ? (
                        <CiEdit style={{ color: "rgb(156, 156, 156)" }} />
                      ) : saved ? (
                        <FaBookmark style={{ color: "rgb(234, 234, 234)" }} />
                      ) : (
                        <MdOutlineBookmarkAdd
                          style={{ color: "rgb(156, 156, 156)" }}
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                  {isOwner && (
                    <Tooltip
                      title="Delete"
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            fontSize: "1.4rem",
                            backgroundColor: "rgba(50, 50, 50, 0.7);",
                            color: "#fff",
                            borderRadius: ".8rem",
                            padding: ".3rem 1rem",
                            boxShadow: 3,
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
                        color="error"
                        onClick={handleDelete}
                      >
                        <MdDeleteOutline />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip
                    title="Listen"
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontSize: "1.4rem",
                          backgroundColor: "rgba(50, 50, 50, 0.7);",
                          color: "#fff",
                          borderRadius: ".8rem",
                          padding: ".3rem 1rem",
                          boxShadow: 3,
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
                      <LuCirclePlay style={{ color: "rgb(156, 156, 156)" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="Share"
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontSize: "1.4rem",
                          backgroundColor: "rgba(50, 50, 50, 0.7);",
                          color: "#fff",
                          borderRadius: ".8rem",
                          padding: ".3rem 1rem",
                          boxShadow: 3,
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
                      <LuShare style={{ color: "rgb(156, 156, 156)" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="More"
                    placement="top"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontSize: "1.4rem",
                          backgroundColor: "rgba(50, 50, 50, 0.7);",
                          color: "#fff",
                          borderRadius: ".8rem",
                          padding: ".3rem 1rem",
                          boxShadow: 3,
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
                      <IoIosMore style={{ color: "rgb(156, 156, 156)" }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Stack>
            <Divider></Divider>
            <Stack component={"div"} mt={"4rem"}>
              <Box sx={{ maxHeight: "50rem", overflow: "hidden" }}>
                <img
                  src={data.blog.imageUrl}
                  alt={data.blog.title}
                  width={"100%"}
                />
              </Box>
              <Typography
                gutterBottom
                variant="h3"
                textTransform={"uppercase"}
                fontWeight={700}
                mt={"3rem"}
              >
                Synopsis
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                fontSize={"1.6rem"}
              >
                {data.blog.synopsis}
              </Typography>
              <Divider sx={{ my: "3.5rem" }}></Divider>
              <Stack component={"div"} mb={"8rem"} fontSize={"1.6rem"}>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {data.blog.content}
                </ReactMarkdown>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default SpecificBlog;
