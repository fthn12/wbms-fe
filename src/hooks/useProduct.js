import { useGetProductsQuery, useEDispatchProductSyncMutation } from "../slices/master-data/productSliceApi";

export const useProduct = () => {
  return { useGetProductsQuery, useEDispatchProductSyncMutation };
};
