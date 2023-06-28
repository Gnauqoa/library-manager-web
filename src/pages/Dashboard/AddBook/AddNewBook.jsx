import {
  Backdrop,
  Button,
  CircularProgress,
  SvgIcon,
  Typography,
  styled,
} from "@mui/material";
import MyInput from "components/MyInput";
import UploadImage from "components/UploadImg";
import React, { useEffect, useState } from "react";
import { searchAuthor } from "services/author";
import { DatePicker } from "@mui/x-date-pickers";
import { searchPublisher } from "services/publisher";
import { ReactComponent as IconBookSave } from "assets/icon/icon_book_saved.svg";
import { ReactComponent as IconWriter } from "assets/icon/icon_writer.svg";
import { ReactComponent as IconPublishing } from "assets/icon/icon_publishing.svg";

import useAPI from "hooks/useApi";
import { addNewBook } from "services/book";
import SelectAtom from "components/MySelect";
import { language } from "services/language";
import { toast } from "react-toastify";
import AddAuthorModal from "./AddAuthorModal";
import AddPublisherModal from "./AddPublisherModal";
import { useSelector } from "react-redux";

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

const AddNewBook = ({ formValue, setFormValue, setSearchBox }) => {
  const rule = useSelector((state) => state.rule);
  const saveRequest = useAPI({
    queryFn: (form_data) => addNewBook(form_data),
  });
  const [addAuthor, setAddAuthor] = useState(false);
  const [addPublisher, setAddPublisher] = useState(false);

  const isDisable = () => {
    return !(
      formValue.book_image &&
      parseInt(formValue.book_count) &&
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
    data.append("publisher", formValue.publisher.id);
    data.append("description", formValue.description);
    data.append("authors", formValue.author.id);
    data.append("book_count", formValue.book_count);
    formValue.languages.forEach((language) =>
      data.append("languages", language)
    );
    formValue.categories.forEach((category) =>
      data.append("categories", category)
    );

    saveRequest
      .run(data)
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
      <AddAuthorModal open={addAuthor} onClose={() => setAddAuthor(false)} />
      <AddPublisherModal
        open={addPublisher}
        onClose={() => setAddPublisher(false)}
      />
      <Typography sx={{ fontSize: 24, fontWeight: 600, fontFamily: "Poppins" }}>
        Add new book
      </Typography>
      <div className="flex flex-row items-center gap-2">
        <Button
          onClick={() => setAddAuthor(true)}
          sx={{ width: "100%" }}
          variant="primary filled"
          startIcon={
            <SvgIcon
              inheritViewBox={true}
              component={IconWriter}
              sx={{ width: 24, height: 24 }}
            />
          }
        >
          Add author
        </Button>
        <Button
          onClick={() => setAddPublisher(true)}
          sx={{ width: "100%" }}
          variant="primary filled"
          startIcon={
            <SvgIcon
              inheritViewBox={true}
              component={IconPublishing}
              sx={{ width: 24, height: 24 }}
            />
          }
        >
          Add publisher
        </Button>
      </div>
      <Typography sx={{ fontSize: 14, fontWeight: 600, fontFamily: "Poppins" }}>
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
      <SelectAtom
        label={"Category"}
        value={formValue.category}
        multiple
        optionList={rule?.category}
        onChange={(e) =>
          setFormValue((prev) => ({ ...prev, category: e.target.value }))
        }
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
        value={formValue.book_count}
        onChange={(e) =>
          setFormValue((prev) => ({
            ...prev,
            book_count: e.target.value,
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

export default AddNewBook;
