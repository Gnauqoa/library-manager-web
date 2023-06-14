import MyInput from "components/MyInput";
import { useState } from "react";
import { ReactComponent as IconAdd } from "assets/icon/icon_archive_add.svg";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";
import { Box, IconButton, SvgIcon, Typography } from "@mui/material";
import CustomTooltip from "components/CustomTooltip";

const CategoryInput = ({ total_category, setTotalCategory }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    if (value === "") return;
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
                  width: 200,
                  paddingY: "16px",
                  boxShadow: "0px 0px 39px 8px rgba(0,0,0,0.1)",
                  background: "#fff",
                  borderRadius: "12px",
                  maxHeight: 200,
                  overflow: "auto",
                }}
              >
                {total_category.map((text, index) => (
                  <div
                    className="flex flex-row items-center py-2 px-3 w-full hover:bg-[#568ABB33] transition-all"
                    key={"category " + index}
                  >
                    <Typography
                      sx={{ fontSize: 16, fontWeight: 400, color: "#000" }}
                    >
                      {text}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        setTotalCategory((prev) => ({
                          ...prev,
                          category: [
                            ...prev.category.slice(0, index),
                            ...prev.category.slice(index + 1),
                          ],
                        }))
                      }
                      sx={{ marginLeft: "auto" }}
                    >
                      <SvgIcon
                        component={IconClose}
                        inheritViewBox={true}
                        sx={{ width: 12, height: 12, color: "#101111" }}
                      />
                    </IconButton>
                  </div>
                ))}
              </Box>
            }
          >
            <div onClick={() => setOpen(true)}>
              <Box
                sx={{
                  minWidth: "200px",
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
