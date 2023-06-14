import { axiosForLibraryAPI } from "./axios";

export const createBorrow = async (body) => {
  const { data } = await axiosForLibraryAPI.request({
    url: "/v1/manager/createBorrow",
    data: body,
    method: "post",
  });
  return data;
};
