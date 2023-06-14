import CustomModal from "components/CustomModal";
import MyInput from "components/MyInput";
import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  SvgIcon,
  Typography,
} from "@mui/material";
import { ReactComponent as IconClose } from "assets/icon/icon_close.svg";
import useAPI from "hooks/useApi";
import { toast } from "react-toastify";
import { addPublisher } from "services/publisher";

const AddPublisherModal = ({ open, onClose }) => {
  const [formValue, setFormValue] = useState(defaultFormValue);
  const addRequest = useAPI({ queryFn: (data) => addPublisher(data) });
  const isDisable = () => {
    return !(formValue.name && formValue.address);
  };
  const handleSave = () => {
    addRequest
      .run({ name: formValue.name, address: formValue.address })
      .then((res) => {
        toast.success("Add author success");
        setFormValue(defaultFormValue);
        onClose();
      })
      .catch((err) => {});
  };
  return (
    <CustomModal open={open} onClose={onClose}>
      <div className="flex flex-col bg-[#fff] p-5 rounded-[12px] w-[500px] gap-3">
        <div className="flex flex-col gap-3 overflow-auto hide-scrollBar">
          <div className="flex flex-row items-center">
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 500,
                color: "#121115",
                fontFamily: "Poppins",
              }}
            >
              Add Publisher
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
          <MyInput
            label="Name:"
            placeholder="Publisher name"
            value={formValue.name}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <MyInput
            label="Address"
            placeholder="Address"
            value={formValue.address}
            onChange={(e) =>
              setFormValue((prev) => ({ ...prev, address: e.target.value }))
            }
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
  address: "",
};
export default AddPublisherModal;
