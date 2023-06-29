import { IconButton, SvgIcon, Typography } from "@mui/material";
import SelectAtom from "components/MySelect";
import React from "react";
import { ReactComponent as IconArrowLeft } from "assets/icon/icon_arrow_left2.svg";
import { ReactComponent as IconArrowRight } from "assets/icon/icon_arrow_right2.svg";

const PageControl = ({
  total_pages,
  total_items,
  current_page,
  setCurrentPage,
  per_page,
}) => {
  return (
    <div className="flex flex-row bg-[#F8F9FB] rounded-[12px] p-6 items-center">
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: "#BEBFC3",
          fontFamily: "Poppins",
        }}
      >
        <span className="text-[#280559]">
          {per_page * (current_page - 1) + 1}{" "}
        </span>
        - {current_page * per_page} of {total_items}
      </Typography>
      <div className="flex flex-row items-center ml-auto gap-4 ">
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: "#BEBFC3",
            fontFamily: "Poppins",
          }}
        >
          The page you're on
        </Typography>
        <div>
          <SelectAtom
            sx={{ padding: 0 }}
            optionList={createOptionList(total_pages)}
            value={current_page}
            onChange={(e) => setCurrentPage(e.target.value)}
          />
        </div>
        <IconButton
          disabled={current_page === 1}
          onClick={() => setCurrentPage(current_page - 1)}
          sx={{
            border: "2px solid #CBD2DC80",
            borderRadius: 3,
            color: "#280559",
            ":disabled": {
              color: "#92929D",
            },
          }}
        >
          <SvgIcon
            sx={{ width: 12, height: 12 }}
            inheritViewBox={true}
            component={IconArrowLeft}
          />
        </IconButton>
        <IconButton
          onClick={() => setCurrentPage(current_page + 1)}
          disabled={current_page === total_pages}
          sx={{
            border: "2px solid #CBD2DC80",
            borderRadius: 3,
            color: "#280559",
            ":disabled": {
              color: "#92929D",
            },
          }}
        >
          <SvgIcon
            sx={{ width: 12, height: 12 }}
            inheritViewBox={true}
            component={IconArrowRight}
          />
        </IconButton>
      </div>
    </div>
  );
};
function createOptionList(total_pages) {
  const result = [];
  for (let i = 1; i <= total_pages; i++) result.push(i);
  return result;
}
export default PageControl;
