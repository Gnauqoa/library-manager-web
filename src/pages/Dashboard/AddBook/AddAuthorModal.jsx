import CustomModal from "components/CustomModal";
import MyInput from "components/MyInput";
import UploadImage from "components/UploadImg";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Button,
  CircularProgress,
  IconButton,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";
import useAPI from "hooks/useApi";
import { addAuthor } from "services/author";
import { toast } from "react-toastify";
const DateDisplay = styled(DatePicker)(({ theme }) => ({
  ".MuiInputBase-root": {
    borderRadius: "12px",
    ":hover": {
      boxShadow: "0px 0px 5px 5px #C3E8FF",
    },
    ":focus": {
      borderColor: "primary.main",
      boxShadow: " 0px 0px 5px 5px #C3E8FF",
    },
  },
  "& input": { border: 0, borderColor: "#fff" },
}));
const AddAuthorModal = ({ open, onClose }) => {
  const [formValue, setFormValue] = useState(defaultFormValue);
  const addRequest = useAPI({ queryFn: (data) => addAuthor(data) });
  const isDisable = () => {
    return !(formValue.avatar_image && formValue.birth && formValue.name);
  };
  const handleSave = () => {
    let data = new FormData();
    data.append("name", formValue.name);
    data.append("personal_name", formValue.personal_name);
    data.append("avatar_image", formValue.avatar_image);
    data.append("birth", formValue.birth);
    data.append("death_date", formValue.death_date);
    data.append("description", formValue.description);

    addRequest
      .run(data)
      .then((res) => {
        toast.success("Add author success");
        setFormValue(defaultFormValue);
        onClose();
      })
      .catch((err) => {});
  };
  return (
    <CustomModal open={open} onClose={onClose}>
      <div className="flex flex-col bg-[#fff] p-5 rounded-[12px] w-[500px] gap-3 h-[700px] ">
        <div className="flex flex-row items-center">
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 500,
              color: "#121115",
              fontFamily: "Poppins",
            }}
          >
            Add Author
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ width: 32, height: 32, marginLeft: "auto" }}
          >
            <SvgIcon
              sx={{ width: "100%", height: "auto" }}
              inheritViewBox={true}
              component={IconClose}
            />
          </IconButton>
        </div>
        <div className="flex flex-col gap-3 overflow-auto hide-scrollBar">
          <div className="w-full">
            <UploadImage
              setFile={(file) =>
                setFormValue((prev) => ({ ...prev, avatar_image: file }))
              }
            />
          </div>
          <MyInput
            label="Author name:"
            placeholder="Author name"
            value={formValue.name}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <MyInput
            label="Personal name (optional)"
            placeholder="Personal name"
            value={formValue.personal_name}
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                personal_name: e.target.value,
              }))
            }
          />
          <div className="flex flex-col gap-2">
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: "#121115",
                fontFamily: "Poppins",
              }}
            >
              Birth
            </Typography>
            <DateDisplay
              value={formValue.birth}
              onChange={(newValue) =>
                setFormValue((prev) => ({ ...prev, birth: newValue }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: "#121115",
                fontFamily: "Poppins",
              }}
            >
              Death day(optional)
            </Typography>
            <DateDisplay
              value={formValue.death_date}
              onChange={(newValue) =>
                setFormValue((prev) => ({ ...prev, death_date: newValue }))
              }
            />
          </div>
          <MyInput
            multiline={true}
            value={formValue.description}
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            label="Description"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <Button
            onClick={onClose}
            variant="primary link"
            sx={{ marginLeft: "auto", padding: "16px 24px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isDisable() || addRequest.loading}
            variant="primary filled"
            sx={{ padding: "16px 24px" }}
          >
            {addRequest.loading ? <CircularProgress size={16} /> : "Save"}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};
const defaultFormValue = {
  name: "",
  avatar_image: null,
  birth: null,
  description: "",
  personal_name: "",
  death_date: "",
};
export default AddAuthorModal;
