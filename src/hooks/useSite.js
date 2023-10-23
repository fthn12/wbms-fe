import {
  useGetSitesQuery,
  useEDispatchSiteSyncMutation,
  useUpdateSitesMutation,
  useCreateSitesMutation,
  useDeleteSitesMutation,
} from "../slices/master-data/siteSliceApi";

export const useSite = () => {
  return {
    useGetSitesQuery,
    useEDispatchSiteSyncMutation,
    useUpdateSitesMutation,
    useCreateSitesMutation,
    useDeleteSitesMutation,
  };
};
