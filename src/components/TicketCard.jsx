import styled from "@emotion/styled";
import { AddBox, Cancel, Person2Rounded, Star } from "@mui/icons-material";
import { Box, IconButton, Rating, Slider, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const StyledBox = styled(Box)(({ theme, bgcolor, sx }) => ({
  display: "grid",
  placeItems: "center",
  backgroundColor: bgcolor || grey[300],
  padding: 12,
  ...sx,
}));

const TicketCard = ({ ticket }) => {
  let bgColor;
  if (ticket?.status == "done") {
    bgColor = "success.light";
  } else if (ticket?.status == "in progress") {
    bgColor = "warning.light";
  } else if (ticket?.status == "stucked") {
    bgColor = "error.light";
  } else {
    bgColor = grey[300];
  }
  return (
    <Stack direction={"row"} gap={0.5} width={"100%"} pr={2} height={90}>
      <StyledBox sx={{ padding: "5px", backgroundColor: bgColor }}></StyledBox>
      <StyledBox
        width={"100%"}
        sx={{ placeItems: "none", alignItems: "center" }}
      >
        {ticket?.title}
      </StyledBox>
      <StyledBox height={"100%"} width={180}>
        {ticket?.avatar || <Person2Rounded sx={{ height: "100%" }} />}
      </StyledBox>
      <StyledBox bgcolor={bgColor} width={{ xs: 220, md: "25%" }}>
        {ticket?.status}
      </StyledBox>
      <StyledBox width={{ xs: 200, md: "20%" }}>
        <Slider
          sx={{ width: "100%" }}
          value={ticket?.progress}
          valueLabelDisplay={"on"}
          slotProps={{
            thumb: { sx: { display: "none" } },
            track: { sx: { height: 10 } },
            rail: { sx: { height: 12 } },
          }}
        />
      </StyledBox>
      <StyledBox sx={{ display: "flex" }}>
        <Rating value={ticket.priority} readOnly/>
      </StyledBox>
      <StyledBox>
        <IconButton sx={{ padding: "1px" }}>
          <Cancel />
        </IconButton>
      </StyledBox>
    </Stack>
  );
};

export default TicketCard;
