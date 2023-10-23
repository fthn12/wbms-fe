import {
  useGetProvincesQuery,
  useUpdateProvincesMutation,
  useCreateProvincesMutation,
  useDeleteProvincesMutation,
} from "../slices/master-data/provinceSliceApi";

export const useProvince = () => {
  return { useGetProvincesQuery, useUpdateProvincesMutation, useCreateProvincesMutation, useDeleteProvincesMutation };
};
