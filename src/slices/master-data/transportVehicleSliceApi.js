import {
  apiSlice
} from "../apiSlice";

const API_URL = "/transport-vehicles";

const transportVehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransportVehicles: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["transport-vehicle"],
    }),
    eDispatchTransportVehicleSync: builder.mutation({
      query: () => ({
        url: `${API_URL}/edispatch-sync`,
        method: "GET",
      }),
      invalidatesTags: ["transport-vehicle"],
    }),
    searchManyTransportVehicle: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: {
          ...data
        },
      }),
    }),
    searchFirstTransportVehicle: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/search-first`,
        method: "POST",
        body: {
          ...data
        },
      }),
    }),
    createTransportVehicle: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateTransportVehicle: builder.mutation({
      query: ({
        id,
        ...data
      }) => ({
        url: `${API_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTransportVehicle: builder.mutation({
      query: (id) => ({
        url: `${API_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTransportVehiclesQuery,
  useSearchManyTransportVehicleQuery,
  useEDispatchTransportVehicleSyncMutation,
  useUpdateTransportVehicleMutation,
  useCreateTransportVehicleMutation,
  useDeleteTransportVehicleMutation
} = transportVehicleApiSlice;