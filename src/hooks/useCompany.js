import {
  useGetCompanyQuery,
  useEDispatchCompanySyncMutation,
  useUpdateCompanyMutation,
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
} from "../slices/master-data/companySliceApi";

export const useCompany = () => {
  return {
    useGetCompanyQuery,
    useEDispatchCompanySyncMutation,
    useUpdateCompanyMutation,
    useCreateCompanyMutation,
    useDeleteCompanyMutation,
  };
};
