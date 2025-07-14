import { Stack, Typography, Paper, Button, Icon } from "@mui/material";
import { FaPenFancy } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { GoPeople } from "react-icons/go";

function HomeBodySection() {
  return (
    <Stack>
      <Stack alignItems={"center"} textAlign={"center"} mb={"5rem"} mt={"8rem"}>
        <Typography
          gutterBottom
          variant="h2"
          color="primary.main"
          fontWeight={800}
        >
          What You will love.
        </Typography>
        <Typography variant="h5" maxWidth={"60%"} color="text.secondary">
          Blogging isn't just about writing, it's about expression, freedom and
          connection. We built this platform to empower creators from all
          backgrounds to share their thoughts, opinions and experiences with no
          boundaries.
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"center"}
        mb={"10rem"}
      >
        <Paper
          variant="outlined"
          sx={{
            bgcolor: "transparent",
            p: "2rem",
            width: 350,
            textAlign: "center",
          }}
        >
          <Icon sx={{ fontSize: "7rem", mb: "2rem", color: "primary.main" }}>
            <FaPenFancy />
          </Icon>
          <Typography gutterBottom variant="h3">
            Write freely.
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Focus on you ideas without distractions.
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Just you and your words.
          </Typography>
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            bgcolor: "transparent",
            p: "2rem",
            width: 350,
            textAlign: "center",
          }}
        >
          <Icon sx={{ fontSize: "7rem", mb: "2rem", color: "primary.main" }}>
            <CiGlobe />
          </Icon>
          <Typography gutterBottom variant="h3">
            Connect Globaly
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Reach people from all over the world who care about your thoughts.
          </Typography>
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            bgcolor: "transparent",
            p: "2rem",
            width: 350,
            textAlign: "center",
          }}
        >
          <Icon sx={{ fontSize: "7rem", mb: "2rem", color: "primary.main" }}>
            <GoPeople />
          </Icon>
          <Typography gutterBottom variant="h3">
            Be Heard. Be Followed.
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Let your words inspire, influence, and build lasting connections.
          </Typography>
        </Paper>
      </Stack>
      <Stack alignItems={"center"} mb={"5rem"}>
        <Typography
          gutterBottom
          variant="h2"
          fontWeight={800}
          color="secondary.main"
        >
          Ready to share you first story?
        </Typography>
        <Typography variant="h5" color="text.secondary" mb={"3rem"}>
          Join the community of passinate writer and curious minds.
        </Typography>
        <Button
          href="/register"
          variant="contained"
          color="secondary"
          sx={{ fontSize: "1.3rem", fontWeight: 700, width: "fit-content" }}
        >
          sign up for free
        </Button>
      </Stack>
    </Stack>
  );
}

export default HomeBodySection;
