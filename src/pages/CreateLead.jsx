import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Rating,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, token } from "../Api/Axios";
import { useDispatch, useSelector } from "react-redux";
import { setLeadDependency } from "../Redux/authSlice";
import { useParams } from "react-router-dom";

const CreateLead = ({ editMode }) => {
  const lead_status = [
    "new",
    "contacted",
    "qualified",
    "lost",
    "canceled",
    "confirmed",
  ];

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  var { id } = useParams();
  const defaultFormData = {
    title: "",
    company: "",
    contact: "",
    address: "",
    email: "",
    creator:
      user.role == "admin"
        ? `${user.first_name} ${user.last_name}`
        : `${user.admin.first_name} ${user.admin.last_name}`,
    lead_owner: `${user.first_name} ${user.last_name}`,
    lead_status: "new",
  };
  const [formData, setFormData] = useState(defaultFormData);
  const handleSubmit = (e) => {
    e.preventDefault();
    editMode
      ? axios
          .put(`${baseURL}/leads/${id}`, formData, {
            headers: { token: token },
          })
          .then((res) => {
            dispatch(setLeadDependency());
          })
      : axios
          .post(`${baseURL}/leads/create`, formData, {
            headers: { token: token },
          })
          .then((res) => {
            dispatch(setLeadDependency());
            setFormData(defaultFormData);
          });
  };
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    editMode ?
      axios
        .get(`${baseURL}/leads/${id}`, { headers: { token: token } })
        .then((res) =>
          setFormData({
            ...res.data.data,
            ["creator"]: `${res.data.data?.creator.first_name} ${res.data.data?.creator.last_name}`,
          })
        ) : setFormData(defaultFormData);
  }, [editMode]);
  return (
    <>
      <Typography variant="h3" component={"h1"} my={3}>
        {editMode ? "Update your Ticket" : "Create a Ticket"}
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
              <FormLabel>Title</FormLabel>
              <OutlinedInput
                placeholder="Title For Ticket"
                color="secondary"
                name="title"
                value={formData?.title}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Company</FormLabel>
              <OutlinedInput
                placeholder="Company Name"
                color="secondary"
                name="company"
                value={formData?.company}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <OutlinedInput
                placeholder="Email"
                color="secondary"
                name="email"
                value={formData?.email}
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
              <FormLabel>Creator</FormLabel>
              <OutlinedInput
                placeholder="Enter Owner Name"
                variant="outlined"
                color="secondary"
                name="owner"
                value={formData?.creator}
                onChange={handleChange}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Lead Owner</FormLabel>
              <OutlinedInput
                placeholder="Enter Lead Owner"
                variant="outlined"
                color="secondary"
                name="lead_owner"
                value={formData?.lead_owner}
                onChange={handleChange}
                disabled
              />
            </FormControl>
            <FormControl color="secondary" sx={{ gap: 1 }}>
              <FormLabel sx={{ position: "relative" }}>Status</FormLabel>
              <Select
                name="lead_status"
                value={formData?.lead_status}
                onChange={handleChange}
                placeholder="Category"
              >
                {lead_status.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.slice(0, 1).toUpperCase() + item.slice(1)}
                  </MenuItem>
                ))}
              </Select>
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

export default CreateLead;
