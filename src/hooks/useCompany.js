import { useGetCompanyQuery, useEDispatchCompanySyncMutation } from "../slices/master-data/companySliceApi";

export const useCompany = () => {
  return { useGetCompanyQuery, useEDispatchCompanySyncMutation };
};
