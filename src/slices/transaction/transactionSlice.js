import { createSlice } from "@reduxjs/toolkit";

import { eDispatchFindOrCreateByQrcode } from "./transactionSliceApi";

const dataLocalStorage = localStorage.getItem("transaction") ? JSON.parse(localStorage.getItem("transaction")) : {};

const initialState = {
  wbTransaction: dataLocalStorage?.curTransaction ? dataLocalStorage.curTransaction : null,
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setWbTransaction: (state, action) => {
      const transaction = action.payload;

      state.wbTransaction = { ...transaction };

      localStorage.setItem("transaction", JSON.stringify(state));
    },
    clearWbTransaction: (state, action) => {
      state.wbTransaction = null;

      localStorage.setItem("transaction", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(eDispatchFindOrCreateByQrcode.pending, (state) => {});

    builder.addCase(eDispatchFindOrCreateByQrcode.fulfilled, (state, action) => {
      const response = action.payload;

      state.wbTransaction = response.data.draftTransaction;
    });

    builder.addCase(eDispatchFindOrCreateByQrcode.rejected, (state, action) => {
      console.log("eDispatchFindOrCreateByQrcode error:", action.payload);
    });
  },
});

export const { setWbTransaction, clearWbTransaction } = transactionSlice.actions;
