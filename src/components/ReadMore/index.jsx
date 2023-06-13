import { useToggle } from "@uidotdev/usehooks";
import React from "react";

const ReadMore = ({ maxlength = 200, text, ...props }) => {
  const [on, toggle] = useToggle(false);
  if (text)
    return (
      <span {...props}>
        {on ? text : text?.slice(0, maxlength)}
        <span
          onClick={toggle}
          className="text-[#4D809C] font-[700] transition-all cursor-pointer"
        >
          {on ? "  Read less" : "  Read more"}
        </span>
      </span>
    );
  return <></>;
};

export default ReadMore;
