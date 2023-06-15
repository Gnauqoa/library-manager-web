import { axiosForLibraryAPI } from "./axios";

export const getUserBorrowing = async (params) => {
  const { data } = await axiosForLibraryAPI
    .request({
      url: "/v1/manager/getUserBorrowingList",
      method: "get",
      params: params,
    })
    .then((res) => res.data);
  return data;
};
