import { apiSlice } from "../apiSlice";

const API_URL = "/driver";

const driverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["driver"],
    }),
    searchManyDriver: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
      providesTags: ["driver"],
    }),
    eDispatchDriverSync: builder.mutation({
      query: () => ({
        url: `${API_URL}/edispatch-sync`,
        method: "GET",
      }),
      invalidatesTags: ["driver"],
    }),

    searchFirstDriver: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/search-first`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createDriver: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateDriver: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${API_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteDriver: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDriverQuery,
  useSearchManyDriverQuery,
  useEDispatchDriverSyncMutation,
  useUpdateDriverMutation,
  useCreateDriverMutation,
  useDeleteDriverMutation,
} = driverApiSlice;
