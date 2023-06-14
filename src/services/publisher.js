import { axiosForLibraryAPI } from "./axios";

export const searchPublisher = async (params) => {
  const { data } = await axiosForLibraryAPI
    .request({ method: "get", url: "/v1/publisher", params: params })
    .then((res) => res.data);
  return data;
};

