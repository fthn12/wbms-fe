import api from "./api";

export const endpoint = "/companies";

export const getAll = async () => {
  const response = await api.get(endpoint);
  return response?.data;
};

export const syncSemai = async () => {
  const response = await api.get(`${endpoint}/sync-with-semai`);
  return response?.data;
};

export const getById = async (id) => {
  const response = await api.get(`${endpoint}/${id}`);
  return response?.data;
};

export const create = async (data) => {
  const response = await api.post(endpoint, data);
  return response?.data;
};

export const update = async (data) => {
  const response = await api.patch(`${endpoint}/${data.id}`, data);
  return response?.data;
};

export const deleteById = async (id) => {
  const response = await api.delete(`${endpoint}/${id}`);
  return response?.data;
};
