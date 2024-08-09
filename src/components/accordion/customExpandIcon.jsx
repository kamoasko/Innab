import { Box } from "@mui/material";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CustomExpandIcon = () => {
  return (
    <Box
      sx={{
        ".Mui-expanded & > .collapsIconWrapper": {
          display: "none",
        },
        ".expandIconWrapper": {
          display: "none",
        },
        ".Mui-expanded & > .expandIconWrapper": {
          display: "block",
        },
      }}
    >
      <div className="expandIconWrapper" style={{ color: "var(--color-main)" }}>
        <FaMinus />
      </div>
      <div className="collapsIconWrapper">
        <FaPlus />
      </div>
    </Box>
  );
};

export default CustomExpandIcon;
