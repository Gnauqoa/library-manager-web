import { saveAs } from "file-saver";
import { utils, write } from "xlsx";

export const saveExcelFile = (array, name) => {
  const data = array;
  const workbook = utils.book_new();
  const worksheet = utils.json_to_sheet(data);

  utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  const excelBuffer = write(workbook, {
    type: "array",
    bookType: "xls",
  });
  const fileData = new Blob([excelBuffer], {
    type: "application/vnd.ms-excel",
  });
  saveAs(fileData, name);
};
