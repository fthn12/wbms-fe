import {
  useGetDriverQuery,
  useSearchManyDriverQuery,
  useEDispatchDriverSyncMutation,
  useUpdateDriverMutation,
  useCreateDriverMutation,
  useDeleteDriverMutation,
} from "../slices/master-data/driverSliceApi";

export const useDriver = () => {
  return {
    useGetDriverQuery,
    useSearchManyDriverQuery,
    useEDispatchDriverSyncMutation,
    useUpdateDriverMutation,
    useCreateDriverMutation,
    useDeleteDriverMutation,
  };
};
