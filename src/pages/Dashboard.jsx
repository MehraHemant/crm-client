import { Card, CardContent, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL, token } from "../Api/Axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dependency = useSelector((state) => state.auth.dependency);
  const leadDependency = useSelector((state) => state.auth.leadDependency);
  const [totalUser, setTotalUser] = useState([]);
  const [totalLeads, setTotalLeads] = useState([]);
  const managers = totalUser.filter((item) => item.role == "manager");
  const employees = totalUser.filter((item) => item.role == "employee");
  useEffect(() => {
    axios
      .get(`${baseURL}/users`, { headers: { token: token } })
      .then((res) => setTotalUser(res.data.data));

    axios
      .get(`${baseURL}/leads/all`, { headers: { token: token } })
      .then((res) => setTotalLeads(res.data.data));
  }, [dependency, leadDependency]);
  return (
    <>
      <Typography variant="h3" component={"h1"} my={3}>
        My Project
      </Typography>
      <Stack direction={'row'} gap={2} flexWrap={'wrap'}>
        <Card sx={{ width: 275 }}>
          <CardContent>
            <Typography variant="h6">Managers</Typography>
            <Typography variant="h6">{managers.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 275 }}>
          <CardContent>
            <Typography variant="h6">Employees</Typography>
            <Typography variant="h6">{employees.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: 275 }}>
          <CardContent>
            <Typography variant="h6">Leads</Typography>
            <Typography variant="h6">{totalLeads.length}</Typography>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default Dashboard;
