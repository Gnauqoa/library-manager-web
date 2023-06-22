import { Button, CircularProgress, Typography } from "@mui/material";
import MyInput from "components/MyInput";
import useAPI from "hooks/useApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRule, setRule } from "services/manager";
import validator from "validator";
const defaultForm = {
  min_age: 0,
  max_age: 0,
  duration: "",
  number_of_category: 0,
  publish_year_gap: 0,
  max_book_bowwow: 0,
  max_days_borrow: 0,
};
const Setting = () => {
  const getRuleRequest = useAPI({ queryFn: getRule, getNow: true });
  const setRuleRequest = useAPI({ queryFn: setRule });
  const [formValue, setFormValue] = useState(defaultForm);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSave = () => {
    setRuleRequest
      .run(formValue)
      .then((res) => {
        toast.success("Update rule success");
      })
      .catch((err) => {});
  };
  useEffect(() => {
    console.log(formValue);
  }, [formValue]);
  useEffect(() => {
    if (getRuleRequest.response) setFormValue(getRuleRequest.response);
  }, [getRuleRequest.response]);
  if (getRuleRequest.isFetched)
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
          <div className="flex flex-row items-center gap-3 w-full">
            <MyInput
              onChange={handleChange}
              value={formValue.min_age}
              name="min_age"
              label="Min age"
              placeholder="Min age"
            />
            <MyInput
              onChange={handleChange}
              value={formValue.max_age}
              name="max_age"
              label="Max age"
              placeholder="Max age"
            />
            <MyInput
              onChange={handleChange}
              value={formValue.duration}
              name="duration"
              label="Duration"
              placeholder="Duration"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <MyInput
              onChange={handleChange}
              value={formValue.number_of_category}
              name="number_of_category"
              label="Number of category"
              placeholder="Number of category"
            />
            <MyInput
              onChange={handleChange}
              value={formValue.publish_year_gap}
              name="publish_year_gap"
              label="Publish year gap"
              placeholder="Publish year gap"
            />
          </div>
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
              label="MMaximum number of borrowing days"
              placeholder="Maximum number of borrowing days"
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={formValue === getRuleRequest.response}
            variant="primary filled"
          >
            Save
          </Button>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col items-center">
      <CircularProgress />
    </div>
  );
};

export default Setting;
