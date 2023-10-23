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
    searchManySites: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
    }),
    searchFirstSites: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/search-first`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createSites: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateSites: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${API_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSites: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSitesQuery,
  useEDispatchSiteSyncMutation,
  useUpdateSitesMutation,
  useCreateSitesMutation,
  useDeleteSitesMutation,
} = siteApiSlice;
