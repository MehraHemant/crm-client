import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box minHeight={"100vh"} bgcolor={"primary.main"}>
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
        <Typography
          variant="h2"
          sx={{
            textShadow:'1px 1px 15px black',
            textTransform: "uppercase",
            color: "white",
          }}
          >
          the world's
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textShadow:'1px 1px 15px black',
            textTransform: "uppercase",
            color: "white",
          }}
          >
          favorite crm.
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textTransform: "uppercase",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px",
            WebkitTextStrokeColor: "white",
          }}
          >
          made in india.
        </Typography>
        <Typography
          variant="h6"
          fontWeight={400}
          fontSize= '1.2rem'
          fontFamily={"roboto"}
          width={"60%"}
          textAlign={'center'}
        >
          Who said world-class software can only be built in Silicon Valley? CRM
          empowers 250,000+ global businesses to deliver fantastic customer
          experiences and drive remarkable growth. Made right here in India–try
          the SaaS from India!
        </Typography>
        <Button variant="contained" color="warning" sx={{borderRadius: '14px', border:'1px solid',mt:5}} >Sign up for free</Button>
      </Box>
    </Box>
  );
};

export default Home;
