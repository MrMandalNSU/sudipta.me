import React from "react";
import {
  Box,
  Container,
  Typography,
  CardContent,
  Stack,
  Link,
  Paper,
  Avatar,
  Chip,
  List,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  EmojiEvents as TrophyIcon,
  Code as CodeIcon,
  EmojiEvents as MedalIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";

const OuterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background: theme.palette.mode === "light"
    ? "rgba(255, 255, 255, 0.4)"
    : "rgba(15, 23, 42, 0.4)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
    borderRadius: 0,
    background: "transparent",
    boxShadow: "none",
  },
}));

const CPCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 41, 59, 0.6)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",


  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 12px 24px rgba(245, 158, 11, 0.2)",
    border: `1px solid ${theme.palette.warning.main}`,
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: 0,
    borderLeft: "none",
    borderRight: "none",
  },
}));

const CPIconBox = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  marginRight: theme.spacing(1.5),
  backgroundColor: "rgba(245, 158, 11, 0.1)",
  color: theme.palette.warning.main,
}));

const CompetitiveProgramming = ({ id }) => {
  const achievements = [
    {
      title: "ACM ICPC Dhaka Regional (2019-2020)",
      description: "Ranked 97th among 190 teams (top 50%). Team: NSU_0011",
      links: [
        { label: "Standings", url: "https://icpc.global/regionals/finder/Dhaka-2020/standings" },
        { label: "ICPC ID", url: "https://icpc.global/ICPCID/E393DOSH1183" }
      ],
      icon: <TrophyIcon />
    },
    {
      title: "NCPC, MIST 2019",
      description: "Ranked top 100 in national level programming contest. Team: NSU_LongLiveBatman",
      links: [],
      icon: <MedalIcon />
    },
    {
      title: "Intra NSU Programming Contest 2018",
      description: "Ranked 10th among 46 individuals in Intra NSU Contest during junior year",
      links: [
        { label: "Standings", url: "https://toph.co/c/inpc-summer-2018/standings" }
      ],
      icon: <MedalIcon />
    },
    {
      title: "Online Judges Problem Solving",
      description: "Solved 650+ problems in online judges. Codeforces rating: Specialist, 1426 (Max) Handle: Mr_Mandal",
      links: [
        { label: "Codeforces Profile", url: "https://codeforces.com/profile/Mr_Mandal" }
      ],
      icon: <CodeIcon />
    },
    {
      title: "Programming Mentor, Problem Setter & Judge",
      description: "Organized, Judged, Setted problems for multiple contests organized by NSU & NSUPS. Conducted and mentored multiple bootcamp sessions for juniors",
      links: [
        { label: "INPC 2023", url: "https://lightoj.com/contest/inpc-231" },
        { label: "INJPC 2024", url: "https://lightoj.com/contest/injpc-2024" },
        { label: "News Article", url: "https://ece.northsouth.edu/intra-nsu-programming-contest-2023/" }
      ],
      icon: <CodeIcon />
    },
  ];

  return (
    <Box
      id={id}
      sx={{
        mt: 0,
        display: "flex",
        alignItems: "center",
        px: { xs: 0, sm: 2 },
        py: { xs: 0, sm: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
        <OuterPaper elevation={3}>
          {/* Header Section */}
          <Box sx={{ mb: { xs: 2, sm: 4 }, pt: { xs: 2, sm: 0 }, px: { xs: 2, sm: 0 }, textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: "text.primary", fontSize: { xs: "1.75rem", sm: "2.125rem" } }} gutterBottom>
              Competitive Programming
            </Typography>
          </Box>

          <Stack spacing={3}>
            {achievements.map((item, index) => (
              <CPCard key={index} elevation={3}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <CPIconBox>
                        {item.icon}
                      </CPIconBox>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, textAlign: { xs: "left", sm: "right" } }}>
                      {item.links.map((link, linkIdx) => (
                        <Link key={linkIdx} href={link.url} target="_blank" rel="noopener noreferrer" underline="none">
                          <Chip
                            icon={<OpenInNewIcon fontSize="small" />}
                            label={link.label}
                            size="small"
                            sx={{
                              cursor: "pointer",
                              fontWeight: 600,
                              backgroundColor: "rgba(245, 158, 11, 0.1)",
                              color: "#d97706",
                              border: "1px solid rgba(245, 158, 11, 0.3)",
                              "&:hover": { backgroundColor: "rgba(245, 158, 11, 0.2)" }
                            }}
                          />
                        </Link>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ mb: 0 }}>
                    <List sx={{ p: 0 }}>
                      <ListItem sx={{ p: 0, alignItems: "flex-start" }}>
                        <Typography variant="body2" sx={{ color: "warning.main", mr: 1, mt: 0.25 }}>
                          ✦
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
                          {item.description}
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </CardContent>
              </CPCard>
            ))}
          </Stack>
        </OuterPaper>
      </Container>
    </Box>
  );
};

export default CompetitiveProgramming;
