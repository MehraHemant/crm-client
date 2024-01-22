import {
  KeyboardArrowDown,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Api/Axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const defaultFormData = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "admin",
  };
  const [formData, setFormData] = useState(defaultFormData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${baseURL}/registration`, formData)
      .then((res) => {
        console.log(res), setFormData(defaultFormData);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((res) =>
        toast.error(res, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      );
  };
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        md={8}
        bgcolor={"success.light"}
        position={"relative"}
        width={"100%"}
      >
        <Stack height={"100vh"} justifyContent={"center"} ml={5}>
          <Typography variant="h3" fontWeight={"bold"}>
            SUPERFAST WORK {<br />} STEADFAST GROWTH
          </Typography>
          <Typography
            variant="body1"
            fontSize={"1.2em"}
            width={"80%"}
            maxWidth={"750px"}
          >
            Bring the very best out of your customer-facing teams with robust
            automation, comprehensive analytics, personalized solutions, and
            more. Sign up and get started in no time—the fastest implementation
            in the enterprise CRM market.
          </Typography>
        </Stack>
        <Box
          position={"absolute"}
          bottom={10}
          left={`calc(50% - 14px)`}
          display={{ md: "none" }}
        >
          <KeyboardArrowDown />
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        xs
        sx={{
          height: "100%",
          width: "100%",
          display: "grid",
        }}
      >
        <Box
          borderRadius={2}
          boxShadow={3}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width={"80%"}
          maxWidth={"400px"}
          m={"auto"}
          paddingY={4}
          gap={3}
          position={"relative"}
          bgcolor={"background.default"}
        >
          <Typography variant="h5" fontWeight={"bolder"} component={"h2"}>
            Create An Account
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit}
            width={"90%"}
            display={"grid"}
            gap={2}
          >
            <Stack direction={"row"} gap={2}>
              <TextField
                variant="outlined"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                label={"First Name"}
              />
              <TextField
                required
                variant="outlined"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                label={"Last Name"}
              />
            </Stack>
            <TextField
              variant="outlined"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              label={"Email"}
            />
            <TextField
              variant="outlined"
              type={passwordVisibility ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              label={"Password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() => setPasswordVisibility((state) => !state)}
                    >
                      {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "fit-content", paddingX: 4, justifySelf: "center" }}
            >
              {isLoading ? <CircularProgress /> : "create account"}
            </Button>
            <Divider />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                component={NavLink}
                to={"/forget-password"}
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "text.primary",
                  cursor: "pointer",
                }}
              >
                forgot password ?
              </Typography>
              <Typography
                component={NavLink}
                to={"/login"}
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: "text.primary",
                  cursor: "pointer",
                }}
              >
                Login
              </Typography>
            </Box>
            <Box
              height={"100px"}
              width={"100px"}
              borderRadius={"50%"}
              bgcolor={"yellow"}
              zIndex={-1}
              position={"absolute"}
              top={"-50px"}
              right={{ xs: "calc(100% - 100px)", md: "-50px" }}
            ></Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
