import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      props.expanded ? (
        <RemoveIcon sx={{ fontSize: "2.2rem" }} />
      ) : (
        <AddIcon sx={{ fontSize: "2.2rem" }} />
      )
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : "false");
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expanded={expanded === "panel1"}
        >
          <Typography>UI/UX dizayner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>İşin təsviri</Typography>
          <Typography>
            UI/UX dizaynerinin öhdəliklərinə istifadəçi tələblərinin toplanması,
            qrafik elementlərin dizaynı və naviqasiya komponentlərinin
            yaradılması daxildir.
          </Typography>
          <Typography>Öhdəlikləri və vəzifələri</Typography>
          <ul>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
          </ul>
          <Typography>Bacarıqları</Typography>
          <ul>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
            <li>
              mobil tətbiqlər üçün istifadəçi interfeyslərini və təcrübələrini
              dizayn edin və inkişaf etdirin
            </li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expanded={expanded === "panel2"}
        >
          <Typography>Frontend developer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{/* Add content for Frontend developer */}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          expanded={expanded === "panel3"}
        >
          <Typography>Backend developer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{/* Add content for Backend developer */}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
