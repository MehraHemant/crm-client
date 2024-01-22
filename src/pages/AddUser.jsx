import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL, token } from "../Api/Axios";
import { useDispatch, useSelector } from "react-redux";
import { setDependency } from "../Redux/authSlice";

const AddUser = ({ editMode, id }) => {
  const user = useSelector((state) => state.auth.user);
  const dependency = useSelector((state) => state.auth.dependency);
  const dispatch = useDispatch();

  const [managers, setManagers] = useState([]);
  const defaultFormData = {
    first_name: "",
    last_name: "",
    email: "",
    contact_num: "",
    role: "",
    password: "",
    manager: "",
  };
  const [formData, setFormData] = useState(defaultFormData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios
        .put(`${baseURL}/user/${id}`, formData, {
          headers: { token: token },
        })
        .then((res) => {
          dispatch(setDependency(!dependency));
          console.log(res.data.msg);
        });
    } else {
      axios
        .post(`${baseURL}/new_user`, formData, { headers: { token: token } })
        .then((res) => {
          dispatch(setDependency(!dependency));
          setFormData(defaultFormData);
        });
    }
  };

  useEffect(() => {
    editMode &&
      axios
        .get(`${baseURL}/user/${id}`, { headers: { token: token } })
        .then((res) => setFormData({ ...defaultFormData, ...res.data.data }));
    axios
      .get(`${baseURL}/managers`, { headers: { token: token } })
      .then((res) => setManagers(res.data.data));
  }, [dependency]);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Stack
      boxShadow={10}
      padding={3}
      borderRadius={2}
      width={{ xs: "100%", md: "420px" }}
      gap={2}
    >
      <Typography variant="h4" textAlign={"center"}>
        {editMode ? "Update User" : "Create A User"}
      </Typography>

      <Stack
        component={"form"}
        onSubmit={handleSubmit}
        direction={{ xs: "column", md: "row" }}
        justifyContent={"center"}
        gap={{ xs: 2, md: 5 }}
      >
        <Stack component={"section"} width={{ xs: "100%", lg: 520 }} gap={2}>
          <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
            <TextField
              variant="outlined"
              value={formData.first_name}
              onChange={handleChange}
              name="first_name"
              label={"First Name"}
            />
            <TextField
              variant="outlined"
              value={formData.last_name}
              onChange={handleChange}
              name="last_name"
              label={"Last Name"}
            />
          </Stack>
          <TextField
            type="email"
            value={formData.email}
            variant="outlined"
            onChange={handleChange}
            name="email"
            label={"Email"}
          />
          <TextField
            type="number"
            onChange={handleChange}
            value={formData.contact_num}
            name="contact_num"
            InputProps={{
              startAdornment: (
                <InputAdornment sx={{ paddingRight: 2 }} position="start">
                  +91
                </InputAdornment>
              ),
            }}
            variant="outlined"
            label={"Contact"}
          />
          <FormControl color="secondary" sx={{ gap: 1 }}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData?.role}
              onChange={handleChange}
              placeholder="Role"
              label={"Role"}
              disabled={editMode && true}
            >
              <MenuItem value={"employee"}> Employee </MenuItem>
              <MenuItem value={"manager"}> Manager </MenuItem>
            </Select>
          </FormControl>
          {formData.role == "employee" && user.role == "admin" && (
            <FormControl color="secondary" sx={{ gap: 1 }}>
              <InputLabel>Manager</InputLabel>
              <Select
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                label={"Manager"}
              >
                {managers.map((item, index) => (
                  <MenuItem value={item?._id} key={index}>
                    {item?.first_name + " " + item?.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {!editMode && (
            <TextField
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              name="password"
              label={"Password"}
            />
          )}
          <Button type="submit" variant="contained">
            {editMode ? "Update user" : "create user"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddUser;
