import { apiSlice } from "../apiSlice";

const API_URL = "/provinces";

const provinceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
    }),
    searchManyProvinces: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
    }),
    searchFirstProvinces: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/search-first`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createProvinces: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateProvinces: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${API_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProvinces: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useUpdateProvincesMutation,
  useCreateProvincesMutation,
  useDeleteProvincesMutation,
} = provinceApiSlice;
