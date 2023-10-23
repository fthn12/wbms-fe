import {
  useGetCitiesQuery,
  useUpdateCitiesMutation,
  useCreateCitiesMutation,
  useDeleteCitiesMutation,
} from "../slices/master-data/citySliceApi";

export const useCity = () => {
  return { useGetCitiesQuery, useUpdateCitiesMutation, useCreateCitiesMutation, useDeleteCitiesMutation };
};
