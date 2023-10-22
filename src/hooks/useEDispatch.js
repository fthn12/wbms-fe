import { useEncodeQrcodeMutation } from "../slices/e-dispatch/eDispatchSliceApi";

export const useEDispatch = () => {
  return { useEncodeQrcodeMutation };
};
