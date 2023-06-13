import { Box, Button, Typography } from "@mui/material";
import React from "react";
import styled from "@mui/system/styled";
import { useNavigate } from "react-router-dom";
const CustomButton = styled(Button)(({ variant }) => ({
  paddingX: 12,
  paddingLeft: 20,
  marginTop: "auto",
  borderRadius: 8,
}));

const BookCard = ({ id, img_url, name, available_book }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ ":hover": { boxShadow: "0px 0px 14px 6px rgba(0,0,0,0.1)" } }}
      className="flex flex-row min-w-[400px] relative gap-5 p-4 rounded-[12px] overflow-hidden"
    >
      <div className="h-[250px] w-full overflow-hidden ">
        <img src={img_url} alt="" className="object-cover " />
      </div>
      <div className="flex flex-col min-w-[35%] gap-5">
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 16,
            fontWeight: 400,
            color: "#0D0842",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 14,
            fontWeight: 400,
            color: "#0D0842",
          }}
        >
          Left over: <span className="pl-[20px] text-[#6C6C6C]">{available_book}</span>
        </Typography>
        <CustomButton
          onClick={() => navigate(`/book/${id}`)}
          variant="primary filled"
        >
          Details
        </CustomButton>
      </div>
    </Box>
  );
};

export default BookCard;
