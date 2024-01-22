import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { baseURL } from "../../Api/Axios";

const ResetPassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const {token} = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post(`${baseURL}/resetPassword/${token}`, formData).then((res) => (
      <TextField
        variant="outlined"
        type={passwordVisibility ? "text" : "password"}
        name="password"
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
    ));
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
        component={"form"}
        onSubmit={handleSubmit}
        item
        md={4}
        xs
        sx={{ height: "100%", width: "100%", display: "grid" }}
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
            CRM Login
          </Typography>
          <Box component={"form"} width={"90%"} display={"grid"} gap={2}>
            <TextField
              variant="outlined"
              type={passwordVisibility ? "text" : "password"}
              name="password"
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
              variant="contained"
              type="submit"
              sx={{ width: "fit-content", paddingX: 4, justifySelf: "center" }}
            >
              Reset Password
            </Button>
            <Divider />
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Typography variant="caption">
                * Kindly Check your email for password reset link.
              </Typography>
              <Typography
                component={NavLink}
                to={"/login"}
                variant="body2"
                sx={{ textDecoration: "none", color: "text.primary" }}
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

export default ResetPassword;
