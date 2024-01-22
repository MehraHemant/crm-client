import {
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { baseURL, token } from "../Api/Axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const defaultFormData = {
    ...user,
    ["name"]: `${user.first_name} ${user.last_name}`,
  };
  const [formData, setFormData] = useState(defaultFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseURL}/leads/create`, formData, {
      headers: { token: token },
    });
  };
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Typography variant="h3" component={"h1"} my={3}>
        Profile
      </Typography>
      <Stack
        gap={3}
        alignItems={"center"}
        direction={"column"}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent={"center"}
          gap={{ xs: 2, md: 5 }}
        >
          <Stack component={"section"} width={{ xs: 320, lg: 520 }} gap={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <OutlinedInput
                color="secondary"
                name="title"
                value={formData?.name}
                onChange={handleChange}
                disabled
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <OutlinedInput
                placeholder="Email"
                color="secondary"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Company</FormLabel>
              <OutlinedInput
                placeholder="Email"
                color="secondary"
                name="email"
                value={formData?.company}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile</FormLabel>
              <OutlinedInput
                placeholder="+91-0123456789"
                color="secondary"
                name="contact"
                value={formData?.contact}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <OutlinedInput
                placeholder="Enter Address"
                variant="outlined"
                typownere="text"
                color="secondary"
                name="address"
                value={formData?.address}
                onChange={handleChange}
              />
            </FormControl>
          </Stack>
          <Stack component={"section"} gap={2} width={{ xs: 320, lg: 520 }}>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <OutlinedInput
                variant="outlined"
                color="secondary"
                name="role"
                value={formData?.role}
                onChange={handleChange}
                disabled
              />
            </FormControl>
          </Stack>
        </Stack>
        <Button variant="contained" type="submit" sx={{ px: 10, mb: 4 }}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default Profile;
