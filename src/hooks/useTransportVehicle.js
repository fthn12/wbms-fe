import {
  useGetTransportVehiclesQuery,
  useSearchManyTransportVehicleQuery,
  useEDispatchTransportVehicleSyncMutation,
  useUpdateTransportVehicleMutation,
  useCreateTransportVehicleMutation,
  useDeleteTransportVehicleMutation,
} from "../slices/master-data/transportVehicleSliceApi";

export const useTransportVehicle = () => {
  return {
    useGetTransportVehiclesQuery,
    useSearchManyTransportVehicleQuery,
    useEDispatchTransportVehicleSyncMutation,
    useUpdateTransportVehicleMutation,
    useCreateTransportVehicleMutation,
    useDeleteTransportVehicleMutation,
  };
};
