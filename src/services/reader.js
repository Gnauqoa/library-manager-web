import { axiosForLibraryAPI } from "./axios";

export const addReader = async (body) => {
  const { data } = await axiosForLibraryAPI
    .request({
      url: "/v1/manager/addUser",
      method: "post",
      data: body,
    })
    .then((res) => res.data);
  return data;
};
