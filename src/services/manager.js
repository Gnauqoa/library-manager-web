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
export const createReturn = async (body) => {
  const { data } = await axiosForLibraryAPI
    .request({
      data: body,
      method: "post",
      url: "/v1/manager/createReturn",
    })
    .then((res) => res.data);
  return data;
};
export const createPayFine = async (body) => {
  const { data } = await axiosForLibraryAPI
    .request({
      data: body,
      method: "post",
      url: "/v1/manager/createPayFine",
    })
    .then((res) => res.data);
  return data;
};
export const getUser = async (params) => {
  const { data } = await axiosForLibraryAPI
    .request({
      params: params,
      method: "get",
      url: "/v1/manager/user",
    })
    .then((res) => res.data);
  return data;
};
export const getRule = async () => {
  const { data } = await axiosForLibraryAPI
    .request({
      method: "get",
      url: "/v1/manager/rule",
    })
    .then((res) => res.data);
  return data;
};
export const setRule = async (body) => {
  const { data } = await axiosForLibraryAPI
    .request({
      method: "post",
      data: body,
      url: "/v1/manager/rule",
    })
    .then((res) => res.data);
  return data;
};
