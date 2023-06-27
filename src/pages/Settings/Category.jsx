import {
  ClickAwayListener,
  IconButton,
  SvgIcon,
  Typography,
} from "@mui/material";
import CustomTooltip from "components/CustomTooltip";
import MyInput from "components/MyInput";
import React, { useState } from "react";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";
import { ReactComponent as IconAddCategory } from "assets/icon/icon_add_category.svg";

const Category = ({ category, setFormValue }) => {
  const [new_category, setNewCategory] = useState("");
  const [search_category, setSearchCategory] = useState("");
  const [open, setOpen] = useState(false);
  const handleAdd = () => {
    setFormValue((prev) => ({
      ...prev,
      category: [...prev.category, new_category],
    }));
    setNewCategory("");
  };
  const handleDelete = (name) => {
    const index = category.findIndex((ele) => ele === name);
    const g = category;
    g.splice(index, 1);
    setFormValue((prev) => ({
      ...prev,
      category: g,
    }));
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <MyInput
        endAdornment={
          <IconButton
            onClick={handleAdd}
            sx={{
              bgcolor: "#2E4958",
              ":hover": { bgcolor: "#2E4958" },
              color: "#fff",
            }}
          >
            <SvgIcon
              component={IconAddCategory}
              inheritViewBox={true}
              sx={{ width: 16, height: 16 }}
            />
          </IconButton>
        }
        label={"Input new category"}
        value={new_category}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div className="min-w-[300px]">
          <CustomTooltip
            onClose={() => setOpen(false)}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <CategoryList
                onDelete={handleDelete}
                category={
                  search_category === ""
                    ? category
                    : category.filter(
                        (name) => name.indexOf(search_category) !== -1
                      )
                }
                setFormValue={setFormValue}
              />
            }
          >
            <div className="w-full" onClick={() => setOpen(true)}>
              <MyInput
                label={"Category list"}
                value={search_category}
                onChange={(e) => setSearchCategory(e.target.value)}
              />
            </div>
          </CustomTooltip>
        </div>
      </ClickAwayListener>
    </div>
  );
};
const CategoryList = ({ category, onDelete }) => {
  return (
    <div className="flex flex-col w-[300px]  bg-[#fff] rounded-[16px] py-4 max-h-[300px] overflow-auto hide-scrollBar">
      {category.map((name, index) => (
        <Item key={`category ${index}`} name={name} onDelete={onDelete} />
      ))}
    </div>
  );
};
const Item = ({ name, onDelete }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      onMouseLeave={() => setFocus(false)}
      onMouseEnter={() => setFocus(true)}
      className="flex flex-row items-center w-full bg-[#fff] hover:bg-[#EFEEF0] px-3 py-3"
    >
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: "#4A4553" }}>
        {name}
      </Typography>
      {focus && (
        <IconButton
          onClick={() => onDelete(name)}
          sx={{ padding: 0, ml: "auto" }}
        >
          <SvgIcon
            sx={{ width: 16, height: 16 }}
            component={IconClose}
            inheritViewBox={true}
          />
        </IconButton>
      )}
    </div>
  );
};
export default Category;
