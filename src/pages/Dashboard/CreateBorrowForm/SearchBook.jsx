import React, { useState } from "react";
import useAPI from "hooks/useApi";
import { searchBook } from "services/book";
import ResultBookDetails from "./ResultBookDetails";
import ResultBooks from "./ResultBooks";
import SearchBox from "components/SearchBox";

const SearchBook = ({ setBorrowList, borrowList }) => {
  const [bookSearch, setBookSearch] = useState("");
  const [currentBook, setCurrentBook] = useState(null);
  const searchRequest = useAPI({ queryFn: (params) => searchBook(params) });
  const handleSearch = () => {
    setCurrentBook(null);
    searchRequest
      .run({ name: bookSearch })
      .then((res) => {})
      .catch((err) => {});
  };
  const handleChooseCurrentBook = (book_id) => {
    setCurrentBook(book_id);
  };
  const handleAddBorrowBook = (book_id, status, detail_book) => {
    if (status)
      return setBorrowList((prev) => [...prev, { id: book_id, detail_book }]);
    setBorrowList((prev) => {
      const index = prev.findIndex((ele) => ele.id === book_id);
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col p-4 bg-[#F8F9FB] rounded-[12px] w-full">
        <SearchBox
          loading={searchRequest.loading}
          value={bookSearch}
          setValue={(value) => setBookSearch(value)}
          placeholder="Find book with name"
          onSearch={handleSearch}
        />
      </div>
      {currentBook ? (
        <ResultBooks
          borrowList={borrowList}
          detail_id={currentBook}
          onAdd={handleAddBorrowBook}
        />
      ) : (
        <ResultBookDetails
          request={searchRequest}
          onChoose={handleChooseCurrentBook}
        />
      )}
    </div>
  );
};

export default SearchBook;
