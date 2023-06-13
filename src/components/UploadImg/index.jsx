import { Box, Button, SvgIcon, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
// import { ReactComponent as UploadIcon } from "assets/img/upload_img.svg";
import UploadIcon from "assets/img/upload_icon.png";
const UploadImage = ({ setFile }) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState();
  const [onOver, setOnOver] = useState();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setOnOver(false);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragExit={() => setOnOver(false)}
      onDragEnter={() => setOnOver(true)}
      className="w-full"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingY: "36px",
          border: " 2px dashed rgba(0, 0, 0, 0.25)",
          width: "100%",
          borderRadius: "12px",
          background: onOver ? "rgba(0, 0, 0, 0.3)" : "#fff",
          gap: "24px",
        }}
      >
        <img
          alt=""
          className="w-[48px] h-auto"
          src={preview ? preview : UploadIcon}
        />

        <div className="flex flex-col">
          <input
            ref={inputRef}
            type="file"
            className="w-0 h-0"
            onChange={handleFileChange}
          />
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              fontFamily: "Poppins",
              paddingBottom: "12px",
            }}
          >
            Select a file or drag and drop here
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              fontFamily: "Poppins",
              color: "#00000066",
            }}
          >
            JPG, PNG or PDF, file size no more than 10MB{" "}
          </Typography>
        </div>
        <Button
          onClick={() => inputRef.current.click()}
          sx={{
            fontSize: 10,
            fontWeight: 400,
            color: "#0F91D2",
            fontFamily: "Poppins",
            borderRadius: "12px",
            padding: "16px 12px",
            border: "1px solid #0F91D2B2",
          }}
        >
          SELECT FILE
        </Button>
      </Box>
    </div>
  );
};

export default UploadImage;
