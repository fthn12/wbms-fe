import { useSelector, useDispatch } from "react-redux";

import * as transactionRedux from "../slices/transaction/transactionSlice";
import {
  eDispatchFindOrCreateByQrcode,
  useOpenCreateByQrcodeSemaiMutation,
  useSearchManyTransactionQuery,
} from "../slices/transaction/transactionSliceApi";

import { useWeighbridge } from "./useWeighbridge";

export const useTransaction = () => {
  const dispatch = useDispatch();

  const { setWb } = useWeighbridge();

  const { wbTransaction } = useSelector((state) => state.transaction);

  const setWbTransaction = (values) => {
    dispatch(transactionRedux.setWbTransaction(values));

    setWb({ onProcessing: true });
  };

  const clearWbTransaction = () => {
    dispatch(transactionRedux.clearWbTransaction());

    setWb({ onProcessing: false });
  };

  const findOrCreateByQrcode = (data) => {
    dispatch(eDispatchFindOrCreateByQrcode(data));
  };

  return {
    wbTransaction,
    setWbTransaction,
    clearWbTransaction,
    findOrCreateByQrcode,
    useOpenCreateByQrcodeSemaiMutation,
    useSearchManyTransactionQuery,
  };
};
