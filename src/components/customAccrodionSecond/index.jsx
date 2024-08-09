import React from "react";
import CustomExpandIcon from "../accordion/customExpandIcon";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

const AccordionSecond = ({ summary, details }) => {
  return (
    <Accordion
      sx={{
        width: "100%",
        padding: "2.3rem 0",
        backgroundColor: "inherit",
        boxShadow: "none",
        borderBottom: "0.1rem solid var(--color-gray)",
        borderRadius: "0 !important",
      }}
    >
      <AccordionSummary
        expandIcon={<CustomExpandIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          sx={{
            color: "var(--color-light-black)",
            fontSize: "2rem",
            lineHeight: "1.8rem",
            fontWeight: "600",
            fontFamily: "inherit",
          }}
        >
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: "400",
            fontFamily: "inherit",
            color: "var(--color-light-black)",
          }}
        >
          {details}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionSecond;
