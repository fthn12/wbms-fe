import {
  useGetStorageTankQuery,
  useSearchManyStorageTankQuery,
  useEDispatchStorageTankSyncMutation,
  useUpdateStorageTankMutation,
  useCreateStorageTankMutation,
  useDeleteStorageTankMutation,
} from "../slices/master-data/storageTankSliceApi";

export const useStorageTank = () => {
  return {
    useGetStorageTankQuery,
    useSearchManyStorageTankQuery,
    useEDispatchStorageTankSyncMutation,
    useUpdateStorageTankMutation,
    useCreateStorageTankMutation,
    useDeleteStorageTankMutation,
  };
};
