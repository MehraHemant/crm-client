import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  AddCircleOutlineRounded,
  DashboardOutlined,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  ListAlt,
  Logout,
  Person,
  Person2Rounded,
} from "@mui/icons-material";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigationItem = [
    {
      icon: <Person />,
      href: "/profile",
      text: `${user?.first_name} (${user?.role})`,
    },
    {
      icon: <DashboardOutlined />,
      href: "/",
      text: "Dashboard",
    },
    {
      icon: <ListAlt />,
      href: "/leads",
      text: "Leads",
    },
    {
      icon: <AddCircleOutlineRounded />,
      href: "/add_leads",
      text: "Add Lead",
    },
    {
      icon: <Person2Rounded />,
      text: "Users",
      href: "/user",
    },
  ];
  const navigate = useNavigate();
  const navbarWidth = 240;
  const [open, setOpen] = useState(false);
  return (
    <Drawer
      variant="permanent"
      sx={(theme) => ({
        "& .MuiDrawer-paper": {
          backgroundColor: "primary.main",
          overflow: "hidden",
          transitionProperty: "width",
          whiteSpace: "nowrap",
          ...(!open && {
            width: "60px",
            [theme.breakpoints.up("md")]: { width: navbarWidth },
          }),
          ...(open && { width: navbarWidth }),
        },
      })}
    >
      <Stack alignItems={open ? "end" : "center"}>
        <IconButton
          sx={{ color: "white", display: { md: "none" } }}
          disableRipple
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardDoubleArrowLeft /> : <KeyboardDoubleArrowRight />}
        </IconButton>
      </Stack>
      <Stack
        alignItems={"center"}
        pt={1}
        color={"white"}
        display={{ xs: "none", md: "flex" }}
      >
        <Typography variant="h5" fontWeight={600}>
          CRM
        </Typography>
      </Stack>
      <List>
        {navigationItem.map((item, index) => (
          <ListItemButton key={index} component={NavLink} to={item.href}>
            <ListItemIcon sx={{ color: "white", cursor: "pointer" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton
          sx={{ color: "white" }}
          onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            navigate("/login");
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Navbar;
Navbar.defaultProps = { navbarWidth: "80px" };
