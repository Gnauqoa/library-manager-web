import { Box, Button, SvgIcon, Typography, styled } from "@mui/material";
import MyInput from "components/MyInput";
import UploadImage from "components/UploadImg";
import React, { useEffect, useState } from "react";
import SearchTab from "./SearchTab";
import { searchAuthor } from "services/author";
import CategoryInput from "./CategoryInput";
import { DatePicker } from "@mui/x-date-pickers";
import { searchPublisher } from "services/publisher";
import { ReactComponent as IconBookSave } from "assets/icon/icon_book_saved.svg";
import useAPI from "hooks/useApi";
import { addBook } from "services/book";
import SelectAtom from "components/MySelect";
import { language } from "services/language";
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
const AddBook = () => {
  const [searchBox, setSearchBox] = useState(defaultSearchBox);
  const [formValue, setFormValue] = useState(defaultFormValue);
  const saveRequest = useAPI({ queryFn: (form_data) => addBook(form_data) });
  const isDisable = () => {
    return !(
      formValue.book_image &&
      parseInt(formValue.count_book) &&
      formValue.author.id &&
      formValue.publisher.id &&
      formValue.category.length &&
      formValue.release_date &&
      formValue.languages.length
    );
  };
  const handleLanguageChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormValue((prev) => ({
      ...prev,
      languages: value,
    }));
  };

  const handleSave = () => {
    let data = new FormData();
    data.append("name", formValue.name);
    data.append("book_image", formValue.book_image);
    data.append("release_date", formValue.release_date);
    data.append("categories", formValue.category);
    data.append("publisher", formValue.publisher.id);
    data.append("description", formValue.description);
    data.append("authors", formValue.author.id);
    data.append("count_book", formValue.count_book);
    formValue.languages.forEach((language) =>
      data.append("languages", language)
    );

    saveRequest
      .run(data)
      .then((res) => {
        toast.success("Add book success");
      })
      .catch((err) => {});
  };
  return (
    <div className="flex flex-row gap-[15px] w-full justify-center">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: "0px 0px 20px 8px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "12px",
          minWidth: 500,
          width: 500,
        }}
      >
        <Typography
          sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Add new book
        </Typography>
        <Typography
          sx={{ fontSize: 14, fontWeight: 600, fontFamily: "Poppins" }}
        >
          Book cover:
        </Typography>
        <div className="w-full">
          <UploadImage
            setFile={(file) =>
              setFormValue((prev) => ({ ...prev, book_image: file }))
            }
          />
        </div>
        <MyInput
          label="Book name:"
          placeholder="Book name"
          value={formValue.name}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <MyInput
          value={formValue?.author?.name}
          onClick={() =>
            setSearchBox({
              open: true,
              title: "Choose author",
              placeholder: "Author name",
              type: "author",
              queryFn: (params) => searchAuthor(params),
              onSelect: (data) => {
                setFormValue((prev) => ({ ...prev, author: data }));
              },
            })
          }
          readOnly={true}
          label="Author:"
          placeholder="Author"
        />
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-col gap-2">
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: "#121115",
                fontFamily: "Poppins",
              }}
            >
              Publisher Date
            </Typography>
            <DateDisplay
              value={formValue.release_date}
              onChange={(newValue) =>
                setFormValue((prev) => ({ ...prev, release_date: newValue }))
              }
            />
          </div>

          <MyInput
            label="Publisher"
            readOnly
            value={formValue.publisher.name}
            onClick={() =>
              setSearchBox({
                open: true,
                title: "Choose publisher",
                placeholder: "Publisher name",
                type: "publisher",
                queryFn: (params) => searchPublisher(params),
                onSelect: (data) => {
                  setFormValue((prev) => ({ ...prev, publisher: data }));
                },
              })
            }
          />
        </div>
        <CategoryInput
          total_category={formValue.category}
          setTotalCategory={setFormValue}
        />
        <SelectAtom
          label="Languages"
          multiple
          value={formValue.languages}
          optionList={language.map((data) => data.name)}
          onChange={handleLanguageChange}
        />
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
      </Box>
      <SearchTab
        {...searchBox}
        onClose={() => setSearchBox((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};
const defaultSearchBox = {
  open: false,
  title: "",
  queryFn: null,
  onSelect: null,
  placeholder: "",
};
const defaultFormValue = {
  name: "",
  author: { id: null, name: "" },
  category: [],
  release_date: null,
  publisher: { id: null, name: "" },
  count_book: 0,
  book_image: null,
  languages: ["English"],
  description: "",
};
export default AddBook;
