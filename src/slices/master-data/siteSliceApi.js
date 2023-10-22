import { apiSlice } from "../apiSlice";

const API_URL = "/sites";

const siteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSites: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["site"],
    }),
    eDispatchSiteSync: builder.mutation({
      query: () => ({
        url: `${API_URL}/edispatch-sync`,
        method: "GET",
      }),
      invalidatesTags: ["site"],
    }),
  }),
});

export const { useGetSitesQuery, useEDispatchSiteSyncMutation } = siteApiSlice;
