import {
  useGetStorageTanksQuery,
  useSearchManyStorageTanksQuery,
  useEDispatchStorageTankSyncMutation,
} from "../slices/master-data/storageTankSliceApi";

export const useStorageTank = () => {
  return { useGetStorageTanksQuery, useSearchManyStorageTanksQuery, useEDispatchStorageTankSyncMutation };
};
