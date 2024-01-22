import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";

const Layout = () => {
  const width = '60px';
  const navbarWidth = '240px';
  return (
    <Stack direction={"row"}>
      <Box width={{ xs: width, md: navbarWidth }}>
        <Navbar width={"100%"} />
      </Box>
      <Box
        width={{ xs: `calc(100% - ${width})`, md: `calc(100% - ${navbarWidth})` }}
        left={{xs: width, md:navbarWidth}}
        pl={2}
        height={"100vh"}
        overflow={"auto"}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Layout;
