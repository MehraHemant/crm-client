import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { baseURL, token } from "../Api/Axios";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setDependency } from "../Redux/authSlice";

const Users = () => {
  const dependency = useSelector((state) => state.auth.dependency);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [id, setId] = useState(undefined);

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/user/${id}`, { headers: { token: token } })
      .then((res) => dispatch(setDependency(!dependency)));
  };
  useEffect(() => {
    axios
      .get(`${baseURL}/users`, { headers: { token: token } })
      .then((res) => setData(res.data.data));
  }, [dependency]);
  return (
    <>
      <Stack direction={"row"} my={3} justifyContent={"space-between"}>
        <Typography variant="h3">Users</Typography>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(!dialogOpen)}
          sx={{ mr: 2, ...(user.role == "employee" && { display: "none" }) }}
        >
          Add User
        </Button>
      </Stack>
      <Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow
                key={item._id}
                onClick={() => {
                  setId(item._id);
                  setEditMode(true);
                  setDialogOpen(true);
                }}
              >
                <TableCell>
                  {item?.first_name
                    ? `${item?.first_name} ${item?.last_name}`
                    : item?.name}
                </TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.role}</TableCell>

                <TableCell>
                  {item.role == "manager"
                    ? ""
                    : item.manager
                    ? item?.manager?.first_name + " " + item?.manager?.last_name
                    : "- -"}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item?._id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditMode(false);
          setId(undefined);
        }}
      >
        <AddUser editMode={editMode} id={id} />
      </Dialog>
    </>
  );
};

export default Users;
