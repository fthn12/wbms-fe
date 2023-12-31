import { apiSlice } from "../apiSlice";

const API_URL = "/storage-tanks";

const storageTankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStorageTank: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["storage-tank"],
    }),
    searchManyStorageTank: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
      providesTags: ["storage-tank"],
    }),
    eDispatchStorageTankSync: builder.mutation({
      query: () => ({
        url: `${API_URL}/edispatch-sync`,
        method: "GET",
      }),
      invalidatesTags: ["storage-tank"],
    }),
    searchFirstStorageTank: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/search-first`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createStorageTank: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateStorageTank: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${API_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteStorageTank: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetStorageTankQuery,
  useSearchManyStorageTankQuery,
  useEDispatchStorageTankSyncMutation,
  useUpdateStorageTankMutation,
  useCreateStorageTankMutation,
  useDeleteStorageTankMutation,
} = storageTankApiSlice;
