import { axiosForLibraryAPI } from "./axios";

export const searchPublisher = async (params) => {
  const { data } = await axiosForLibraryAPI
    .request({ method: "get", url: "/v1/publisher", params: params })
    .then((res) => res.data);
  return data;
};
export const addPublisher = async (body) => {
  const { data } = await axiosForLibraryAPI
    .request({ method: "post", url: "/v1/manager/addPublisher", data: body })
    .then((res) => res.data);
  return data;
};
