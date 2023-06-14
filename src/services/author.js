import { axiosForLibraryAPI } from "./axios";

export const searchAuthor = async (params) => {
  const { data } = await axiosForLibraryAPI
    .request({ method: "get", url: "/v1/author", params: params })
    .then((res) => res.data);
  return data;
};
export const addAuthor = async (form_data) => {
  const { data } = await axiosForLibraryAPI
    .request({ method: "post", url: "/v1/manager/addAuthor", data: form_data })
    .then((res) => res.data);
  return data;
};
