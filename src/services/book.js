const { axiosForLibraryAPI } = require("./axios");

export const addBook = async (form_data) => {
  console.log(form_data);
  const { data } = await axiosForLibraryAPI
    .request({
      url: "/v1/manager/addBookDetails",
      method: "post",
      data: form_data,
    })
    .then((res) => res.data);
  return data;
};
