import { apiSlice } from "../apiSlice";

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
  }),
});

export const { useGetTransportVehiclesQuery, useEDispatchTransportVehicleSyncMutation } = transportVehicleApiSlice;
