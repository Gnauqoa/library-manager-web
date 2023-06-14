import React from "react";
import { Button, Typography } from "@mui/material";

const SegmentTab = ({ value, index, title, setValue, padding = undefined }) => {
  return (
    <Button
      onClick={() => setValue(index)}
      sx={{
        textTransform: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: padding === undefined ? "11px 16px" : padding,
        fontSize: 12,
        fontWeight: 600,
        background: value === index ? "#2E4958" : "#ffffff",
        border: "1px",
        borderStyle: "solid",
        borderColor: value === index ? "#2E4958" : "#9D9AA4",
        borderLeft: "0px",
        borderRight: "1px solid #9D9AA4",
        borderRadius: "0px",
        ":hover": {
          background: value === index ? "#2E4958" : "#FBEBF3",
        },
        ":first-of-type": {
          borderRadius: "90px 0px 0px 90px",
          borderLeft: `1px solid ${value === index ? "#2E4958" : "#9D9AA4"}`,
        },
        ":last-child": {
          borderRadius: "0px 90px 90px 0px",
          borderRight: `1px solid ${value === index ? "#2E4958" : "#9D9AA4"}`,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "Poppins",
          color: value === index ? "#ffffff" : "#5C5668",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};
const SegmentRender = ({ value, index, children }) => {
  if (value === index) return children;
  return <></>;
};

export { SegmentRender };
export default SegmentTab;
