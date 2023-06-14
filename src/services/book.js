const { axiosForLibraryAPI } = require("./axios");

export const addNewBook = async (form_data) => {
  const { data } = await axiosForLibraryAPI
    .request({
      url: "/v1/manager/addBookDetails",
      method: "post",
      data: form_data,
    })
    .then((res) => res.data);
  return data;
};
export const addOldBook = async (body) => {
  const { data } = await axiosForLibraryAPI
    .request({
      url: "/v1/manager/addBook",
      method: "post",
      data: body,
    })
    .then((res) => res.data);
  return data;
};
export const searchBook = async (params) => {
  const { data } = await axiosForLibraryAPI
    .request({
      method: "get",
      url: "/v1/book",
      params: params,
    })
    .then((res) => res.data);
  return data;
};
