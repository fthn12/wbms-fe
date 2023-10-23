import { apiSlice } from "../apiSlice";

const API_URL = "/cities";

const cityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
    }),
    searchManyCities: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
    }),
    searchFirstCities: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/search-first`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createCities: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCities: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${API_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCities: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetCitiesQuery, useUpdateCitiesMutation, useCreateCitiesMutation, useDeleteCitiesMutation } =
  cityApiSlice;
