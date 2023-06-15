import { axiosForLibraryAPI } from "./axios";

export const createBorrow = async (body) => {
  const { data } = await axiosForLibraryAPI
    .request({
      url: "/v1/manager/createBorrow",
      data: body,
      method: "post",
    })
    .then((res) => res.data);
  return data;
};
export const createReturn = (body) => {
  const { data } = axiosForLibraryAPI
    .request({
      data: body,
      method: "post",
      url: "/v1/manager/createReturn",
    })
    .then((res) => res.data);
  return data;
};
