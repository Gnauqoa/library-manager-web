import MyInput from "components/MyInput";
import { useState } from "react";
import { ReactComponent as IconAdd } from "assets/icon/icon_archive_add.svg";
import { Box, IconButton, SvgIcon, Typography } from "@mui/material";
import CustomTooltip from "components/CustomTooltip";

const CategoryInput = ({ total_category, setTotalCategory }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    setTotalCategory((prev) => ({
      ...prev,
      category: [value, ...prev.category],
    }));
    setValue("");
  };
  return (
    <div className="flex flex-col gap-2">
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "#121115",
          fontFamily: "Poppins",
        }}
      >
        Category
      </Typography>
      <div className="flex flex-row  gap-4 items-center">
        <MyInput
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        <IconButton
          onClick={handleAdd}
          sx={{
            padding: 1,
            background: "#2E4958",
            color: "#fff",
            ":hover": { background: "#2E4958", color: "#fff" },
          }}
        >
          <SvgIcon inheritViewBox={true} component={IconAdd} />
        </IconButton>
        <div className="h-full">
          <CustomTooltip
            open={open}
            onClose={() => setOpen(false)}
            disableFocusListener
            disableTouchListener
            title={
              <Box
                sx={{
                  width: 100,
                  paddingY: "20px",
                  boxShadow: "0px 0px 39px 8px rgba(0,0,0,0.1)",
                  background: "#fff",
                  borderRadius: "12px",
                }}
              ></Box>
            }
          >
            <div onClick={() => setOpen(true)}>
              <Box
                sx={{
                  minWidth: "100px",
                  border: "2px solid #DEDDE1",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  ":hover ": {
                    boxShadow: "0px 0px 5px 5px #C3E8FF",
                  },
                  "&.Mui-focused ": {
                    borderColor: "primary.main",
                    boxShadow: " 0px 0px 5px 5px #C3E8FF",
                  },
                  height: "100%",
                  transition: "all 0.15s",
                }}
              >
                <Typography>{total_category[0]}</Typography>
              </Box>
            </div>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default CategoryInput;
