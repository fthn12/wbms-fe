import { apiSlice } from "../apiSlice";

const API_URL = "/companies";

const CompanyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    eDispatchCompanySync: builder.mutation({
      query: () => ({
        url: `${API_URL}/edispatch-sync`,
        method: "GET",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

export const { useGetCompanyQuery, useEDispatchCompanySyncMutation } = CompanyApiSlice;
