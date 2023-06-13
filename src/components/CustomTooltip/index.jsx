import React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    padding: 0,
    boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.34)",
  },
}));
const CustomTooltip = ({ children, ...props }) => {
  return <LightTooltip {...props}>{children}</LightTooltip>;
};

export default CustomTooltip;
