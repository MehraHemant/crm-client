import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL, token } from "../Api/Axios";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import { setLeadDependency } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate();
  const LeadDependency = useSelector((state) => state.auth.leadDependency);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/leads/all`, { headers: { token: token } })
      .then((res) => setLeads(res.data.data));
  }, [LeadDependency]);

  const handleConfirm = (id) => {
    axios
      .delete(`${baseURL}/leads/${id}`, { headers: { token: token } })
      .then((res) => {
        dispatch(setLeadDependency());
        setOpenConfirmation(false);
      });
  };
  return (
    <Box>
      <Stack my={3}>
        <Typography variant="h3">Leads</Typography>
      </Stack>
      <Table sx={{ overflow: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Company</TableCell>
            <TableCell align="center">Mobile</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Owner</TableCell>
            <TableCell align="center">Creator</TableCell>
            <TableCell align="center">Lead Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.map((item, i) => (
            <TableRow key={i}>
              <TableCell align="center">{item.title}</TableCell>
              <TableCell align="center">{item.company}</TableCell>
              <TableCell align="center">{item.contact}</TableCell>
              <TableCell align="center">{item.email}</TableCell>
              <TableCell align="center">
                {item.lead_owner?.first_name + " " + item.lead_owner?.last_name}
              </TableCell>
              <TableCell align="center">
                {item.creator?.first_name + " " + item.creator?.last_name}
              </TableCell>
              <TableCell align="center">{item.lead_status}</TableCell>
              <TableCell align="center">
                <Stack direction={"row"} gap={1}>
                  <IconButton onClick={()=> navigate(`/lead/${item._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{...((user.role!='admin') && {display: 'none'})}} onClick={() => setOpenConfirmation(true)}>
                    <Delete />
                  </IconButton>
                </Stack>
              </TableCell>
              <Dialog open={openConfirmation}>
                <Stack p={2} gap={2}>
                  <Typography variant="h6">
                    Do you want to delete this lead ?
                  </Typography>
                  <Stack direction={"row"} justifyContent={"space-around"}>
                    <Button
                      variant="contained"
                      onClick={() => handleConfirm(item._id)}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenConfirmation(false)}
                    >
                      No
                    </Button>
                  </Stack>
                </Stack>
              </Dialog>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Leads;
