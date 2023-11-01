import {
  useGetProductQuery,
  useEDispatchProductSyncMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../slices/master-data/productSliceApi";

export const useProduct = () => {
  return {
    useGetProductQuery,
    useEDispatchProductSyncMutation,
    useUpdateProductMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
  };
};
