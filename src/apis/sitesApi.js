import { axiosBase } from "../slices/apiSlice";

const endpoint = "/sites";

export const getAll = async () => {
  const response = await axiosBase.get(endpoint);

  return response?.data;
};
export const syncSemai = async () => {
  const response = await axiosBase.get(`${endpoint}/sync-with-semai`);
  return response?.data;
};
export const getById = async (id) => {
  const response = await axiosBase.get(`${endpoint}/${id}`);
  return response?.data;
};

export const create = async (data) => {
  const response = await axiosBase.post(endpoint, data);
  return response?.data;
};

export const update = async (data) => {
  const response = await axiosBase.patch(`${endpoint}/${data.id}`, data);
  return response?.data;
};

export const deleteById = async (id) => {
  const response = await axiosBase.delete(`${endpoint}/${id}`);
  return response?.data;
};
