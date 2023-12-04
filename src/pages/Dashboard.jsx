import { Stack, Typography } from "@mui/material";
import React from "react";
import TicketCard from "../components/TicketCard";
import { tickets } from "../demoData";

const Dashboard = () => {
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <>
      <Typography variant="h3" component={"h1"} my={3}>
        My Project
      </Typography>
      <Stack gap={2}>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <Stack key={categoryIndex} gap={0.5}>
              <Typography variant="h5">{uniqueCategory}</Typography>
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, ticketIndex) => (
                  <TicketCard key={ticketIndex} ticket={filteredTicket}/>
                ))}
            </Stack>
          ))}
      </Stack>
    </>
  );
};

export default Dashboard;
