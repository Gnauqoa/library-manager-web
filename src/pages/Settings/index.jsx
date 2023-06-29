import { Button, CircularProgress, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import useAPI from "hooks/useApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setRuleSystem } from "reducers/ruleReducer";
import { setRule } from "services/manager";
import Category from "./Category";

const defaultForm = {
  min_age: 0,
  max_age: 0,
  duration: "",
  number_of_category: 0,
  publish_year_gap: 0,
  max_book_bowwow: 0,
  category: [],
  max_days_borrow: 0,
};

const Setting = () => {
  const [formValue, setFormValue] = useState(defaultForm);
  const rule = useSelector((state) => state.rule);
  const updateRuleRequest = useAPI({ queryFn: setRule });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSave = () => {
    updateRuleRequest
      .run(formValue)
      .then((res) => {
        dispatch(setRuleSystem(formValue));
        toast.success("Update success");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    if (rule) setFormValue(rule);
  }, [rule]);
  if (!rule) return <CircularProgress></CircularProgress>;
  return (
    <div className="flex flex-col gap-9 w-full">
      <Typography
        sx={{
          fontSize: 36,
          fontWeight: 700,
          color: "#333333",
          fontFamily: "Poppins",
        }}
      >
        Settings
      </Typography>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-4 border-[3px] border-[#E55300] rounded-[8px] p-4">
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#E55300",
              fontFamily: "Poppins",
            }}
          >
            User register setting
          </Typography>
          <div className="flex flex-row items-center gap-3 w-full">
            <MyInput
              onChange={handleChange}
              value={formValue.min_age}
              name="min_age"
              label="User min age"
              placeholder="Min age"
            />
            <MyInput
              onChange={handleChange}
              value={formValue.max_age}
              name="max_age"
              label="User max age"
              placeholder="Max age"
            />
            <MyInput
              onChange={handleChange}
              value={formValue.duration}
              name="duration"
              label="Expire time (month)"
              placeholder="month"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 border-[3px] border-[#0098b3] rounded-[8px] p-4">
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#0098b3",
              fontFamily: "Poppins",
            }}
          >
            Book settings
          </Typography>
          <div className="flex flex-row items-center gap-3">
            <MyInput
              onChange={handleChange}
              value={formValue.publish_year_gap}
              name="publish_year_gap"
              label="Book publish year gap (year)"
              placeholder="year"
            />
          </div>
          <Category category={formValue.category} setFormValue={setFormValue} />
        </div>
        <div className="flex flex-col gap-4 border-[3px] border-[#4444d5] rounded-[8px] p-4">
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#4444d5",
              fontFamily: "Poppins",
            }}
          >
            Borrow settings
          </Typography>
          <div className="flex flex-row items-center gap-3">
            <MyInput
              onChange={handleChange}
              value={formValue.max_book_bowwow}
              label="Maximum number of borrowing books"
              placeholder="Maximum number of borrowing books"
            />
            <MyInput
              onChange={handleChange}
              value={formValue.max_days_borrow}
              label="Maximum number of borrowing days"
              placeholder="Maximum number of borrowing days"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={formValue === rule}
          variant="primary filled"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Setting;
