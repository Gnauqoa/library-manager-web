import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchTab from "./SearchTab";
import AddNewBook from "./AddNewBook";
import SegmentTab, { SegmentRender } from "components/SegmentTab";
import AddOldBook from "./AddOldBook";

const AddBook = () => {
  const [searchBox, setSearchBox] = useState(defaultSearchBox);
  const [formValue, setFormValue] = useState(defaultFormValue);
  const [tab, setTab] = useState(0);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row w-full">
        <SegmentTab
          title="Add new book"
          value={tab}
          index={0}
          setValue={setTab}
        />
        <SegmentTab
          setValue={setTab}
          title="Add old book"
          value={tab}
          index={1}
        />
      </div>
      <div className="flex flex-row gap-[15px] w-full justify-center">
        <div>
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
              height: "auto",
            }}
          >
            <SegmentRender value={tab} index={0}>
              <AddNewBook
                formValue={formValue}
                setSearchBox={setSearchBox}
                setFormValue={setFormValue}
              />
            </SegmentRender>
            <SegmentRender value={tab} index={1}>
              <AddOldBook
                formValue={formValue}
                setSearchBox={setSearchBox}
                setFormValue={setFormValue}
              />
            </SegmentRender>
          </Box>
        </div>

        <SearchTab
          {...searchBox}
          onClose={() => setSearchBox((prev) => ({ ...prev, open: false }))}
        />
      </div>
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
  book: { id: null, name: "" },
};
export default AddBook;
