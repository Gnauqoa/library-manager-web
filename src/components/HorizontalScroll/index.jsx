import React, { useRef } from "react";
import { ReactComponent as IconArrowLeft } from "assets/icon/icon_arrow_left.svg";
import { ReactComponent as IconArrowRight } from "assets/icon/icon_arrow_right.svg";

import { useState } from "react";
import { IconButton, SvgIcon } from "@mui/material";

const HorizontalScroll = ({ children }) => {
  const [scrollBarLoc, setScrollBarLoc] = useState(0);
  const ScrollBar = useRef({
    current: {
      scrollWidth: 0,
      clientWidth: 0,
    },
  });
  const clickLeftArrow = () => {
    ScrollBar.current.scrollLeft = ScrollBar.current.scrollLeft - 100;
    setScrollBarLoc(ScrollBar.current.scrollLeft);
  };
  const clickRightArrow = () => {
    ScrollBar.current.scrollLeft = ScrollBar.current.scrollLeft + 100;
    setScrollBarLoc(ScrollBar.current.scrollLeft);
  };
  const onScroll = (e) => {
    setScrollBarLoc(e.currentTarget.scrollLeft);
  };
  return (
    <div className="flex flex-row w-full justify-center items-center ">
      <div className="flex flex-col pr-4">
        <IconButton
          onClick={clickLeftArrow}
          sx={{
            width: 38,
            height: 38,
            backdropFilter: "blur(50px)",
            color: "#0D0842",
            boxShadow: "6px 0px 17px 11px rgba(0,0,0,0.1)",
          }}
          disabled={scrollBarLoc === 0}
        >
          <SvgIcon component={IconArrowLeft} inheritViewBox={true} />
        </IconButton>
      </div>
      <div
        ref={ScrollBar}
        onScroll={(e) => onScroll(e)}
        className="flex flex-row w-full gap-[24px] p-4 scroll-smooth overflow-auto hide-scrollBar"
      >
        {children}
      </div>
      <div className="flex flex-col justify-center pl-4">
        <IconButton
          onClick={clickRightArrow}
          sx={{
            width: 38,
            height: 38,
            backdropFilter: "blur(50px)",
            color: "#0D0842",
            boxShadow: "-6px 0px 17px 11px rgba(0,0,0,0.1)",
          }}
          disabled={
            scrollBarLoc + 1 >=
            ScrollBar.current.scrollWidth - ScrollBar.current.clientWidth
          }
        >
          <SvgIcon component={IconArrowRight} inheritViewBox={true} />
        </IconButton>
      </div>
    </div>
  );
};

export default HorizontalScroll;
