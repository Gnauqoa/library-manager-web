import { Backdrop, Button, CircularProgress, SvgIcon } from "@mui/material";
import MyInput from "components/MyInput";
import useAPI from "hooks/useApi";
import React from "react";
import { toast } from "react-toastify";
import { addOldBook, searchBook } from "services/book";
import { ReactComponent as IconBookSave } from "assets/icon/icon_book_saved.svg";

const AddOldBook = ({ formValue, setFormValue, setSearchBox }) => {
  const saveRequest = useAPI({ queryFn: (data) => addOldBook(data) });
  const isDisable = () => {
    return !(formValue.book.id && parseInt(formValue.count_book));
  };
  const handleSave = () => {
    saveRequest
      .run({
        book_detail_id: formValue.book.id,
        book_count: formValue.count_book,
      })
      .then((res) => {
        toast.success("Add book success");
      })
      .catch((err) => {});
  };
  return (
    <div className="flex flex-col gap-6">
      <Backdrop open={saveRequest.loading}>
        <CircularProgress />
      </Backdrop>
      <MyInput
        label="Book"
        value={formValue?.book?.name}
        onClick={() =>
          setSearchBox({
            open: true,
            title: "Choose book",
            placeholder: "Book name",
            type: "book",
            queryFn: (params) => searchBook(params),
            onSelect: (data) => {
              setFormValue((prev) => ({ ...prev, book: data }));
            },
          })
        }
        readOnly={true}
        placeholder="Book name"
      />
      <MyInput
        value={formValue.count_book}
        onChange={(e) =>
          setFormValue((prev) => ({
            ...prev,
            count_book: e.target.value,
          }))
        }
        label="Count book"
        type="number"
      />
      <Button
        onClick={handleSave}
        disabled={isDisable() || saveRequest.loading}
        variant="primary filled"
        sx={{ marginLeft: "auto" }}
        startIcon={
          <SvgIcon
            inheritViewBox={true}
            component={IconBookSave}
            sx={{ width: 16, height: 16 }}
          />
        }
      >
        Save
      </Button>
    </div>
  );
};

export default AddOldBook;
