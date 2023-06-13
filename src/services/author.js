import { axiosForLibraryAPI } from "./axios";

export const searchAuthor = async (params) => {
  const { data } = await axiosForLibraryAPI
    .request({ method: "get", url: "/v1/author", params: params })
    .then((res) => res.data);
  return data;
};
