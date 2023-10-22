import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { toast } from "react-toastify";
import moment from "moment";

import Header from "../../../../components/layout/signed/HeaderTransaction";
import QRCodeViewer from "../../../../components/QRCodeViewer";

import { useForm } from "../../../../utils/useForm";
import * as TransactionAPI from "../../../../apis/transactionApi";

import { useAuth, useConfig, useTransaction, useWeighbridge, useApp } from "../../../../hooks/";

const TransactionPksCancelOut = (props) => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { setSidebar } = useApp();
  const { WBMS, SCC_MODEL } = useConfig();
  const { wbTransaction, setWbTransaction, clearWbTransaction } = useTransaction();
  const { wb } = useWeighbridge();

  const { values, setValues, handleInputChange } = useForm({ ...TransactionAPI.InitialData });

  const [originWeighNetto, setOriginWeighNetto] = useState(0);
  const [returnWeighNetto, setReturnWeighNetto] = useState(0);

  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    clearWbTransaction();

    navigate("/wb/transactions/1");
  };

  const handleSubmit = async () => {
    let tempTrans = { ...values };

    try {
      // tempTrans.returnWeighOutTimestamp = SemaiUtils.GetDateStr();
      tempTrans.returnWeighOutTimestamp = moment().toDate();
      tempTrans.returnWeighOutOperatorName = user.name;

      const data = { wbTransaction: { ...tempTrans } };

      const response = await TransactionAPI.eDispatchPksWbOutCancelAfter(data);

      if (!response.status) {
        throw new Error(response?.message);
      }

      setWbTransaction(response.data.transaction);
      setValues({ ...response.data.transaction });
      setIsSubmitted(true);

      toast.success(`Transaksi WB-OUT CANCEL telah tersimpan.`);
    } catch (error) {
      toast.error(`${error.message}.`);
      return;
    }
  };

  useEffect(() => {
    if (!wbTransaction) {
      handleClose();
      return;
    }

    setSidebar({ selected: "Transaksi WB PKS" });
    setValues(wbTransaction);

    return () => {
      // console.clear();
    };
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      setValues((prev) => ({
        ...prev,
        returnWeighOutKg: wb.weight,
      }));
    }
  }, [wb.weight]);

  useEffect(() => {
    if (values.originWeighInKg < WBMS.WBMS_WB_MIN_WEIGHT || values.originWeighOutKg < WBMS.WBMS_WB_MIN_WEIGHT) {
      setOriginWeighNetto(0);
    } else {
      let total = Math.abs(values.originWeighInKg - values.originWeighOutKg);

      setOriginWeighNetto(total);
    }

    if (values.returnWeighInKg < WBMS.WBMS_WB_MIN_WEIGHT || values.returnWeighOutKg < WBMS.WBMS_WB_MIN_WEIGHT) {
      setReturnWeighNetto(0);
    } else {
      let total = Math.abs(values.returnWeighInKg - values.returnWeighOutKg);

      setReturnWeighNetto(total);
    }
  }, [values]);

  // Untuk validasi field
  useEffect(() => {
    let cSubmit = false;

    if (values.returnWeighOutKg >= WBMS.WBMS_WB_MIN_WEIGHT) cSubmit = true;

    setCanSubmit(cSubmit);
  }, [values]);

  return (
    <Box>
      <Header title="TRANSAKSI PKS" subtitle="WB-OUT CANCEL" />

      <Box display="flex" sx={{ mt: 3 }}>
        <Box flex={1}></Box>
        <Button variant="contained" disabled={!(values.progressStatus === 9)} onClick={handleClose}>
          TUTUP
        </Button>
      </Box>

      <Paper sx={{ mt: 1, p: 2, minHeight: "72vh" }}>
        <Grid container spacing={1}>
          <Grid item xs={3} sm={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: "whitesmoke" }}
              label="NO BONTRIP"
              name="bonTripNo"
              value={values?.bonTripNo || ""}
              inputProps={{ readOnly: true }}
            />

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              label="NOMOR POLISI"
              name="transportVehiclePlateNo"
              value={values?.transportVehiclePlateNo || ""}
              inputProps={{ readOnly: true }}
            />

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              label="NAMA SUPIR"
              name="driverFullName"
              value={values?.jsonData?.driverFullName || ""}
              inputProps={{ readOnly: true }}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              label="NAMA VENDOR/TRANSPORTER"
              name="transporterCompanyFullName"
              value={values?.jsonData?.transporterCompanyFullName || ""}
              inputProps={{ readOnly: true }}
            />

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              label="SERTIFIKASI TRUK"
              name="vehicleAllowableSccModel"
              value={SCC_MODEL[values?.jsonData?.vehicleAllowableSccModel || 0]}
              inputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={3} sm={6}>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="BERAT MASUK - IN"
              name="originWeighInKg"
              value={values?.originWeighInKg > 0 ? values.originWeighInKg.toFixed(2) : "0.00"}
              inputProps={{ readOnly: true }}
            />

            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="BERAT KELUAR - OUT"
              name="originWeighOutKg"
              value={values?.originWeighOutKg > 0 ? values.originWeighOutKg.toFixed(2) : "0.00"}
              inputProps={{ readOnly: true }}
            />

            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="TOTAL"
              name="weightNetto"
              value={originWeighNetto > 0 ? originWeighNetto.toFixed(2) : "0.00"}
              inputProps={{ readOnly: true }}
            />

            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="RETUR BERAT MASUK - IN"
              name="returnWeighInKg"
              value={values?.returnWeighInKg > 0 ? values.returnWeighInKg.toFixed(2) : "0.00"}
              inputProps={{ readOnly: true }}
            />

            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="RETUR BERAT KELUAR - OUT"
              name="returnWeighOutKg"
              value={values?.returnWeighOutKg > 0 ? values.returnWeighOutKg.toFixed(2) : "0.00"}
              inputProps={{ readOnly: true }}
            />

            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="TOTAL RETUR"
              name="returnWeightNetto"
              value={returnWeighNetto > 0 ? returnWeighNetto.toFixed(2) : "0.00"}
              inputProps={{ readOnly: true }}
            />

            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2 }}
              multiline
              rows={3}
              label="CATATAN CANCEL"
              name="returnWeighOutRemark"
              value={values?.returnWeighOutRemark || ""}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />

            {/* <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mt: 2 }}
              multiline
              rows={3}
              label="Catatan WB-IN Cancel"
              name="returnWeighInRemark"
              value={values?.returnWeighInRemark || ""}
              onChange={(e) => {
                handleInputChange(e);
              }}
            /> */}

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
              onClick={handleSubmit}
              disabled={!(canSubmit && values.progressStatus === 7 && wb?.isStable)}
            >
              Simpan
            </Button>

            <QRCodeViewer wbTransaction={wbTransaction} type="form" />

            {/* <Button
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleClose}
              disabled={!(values.progressStatus === 9)}
            >
              Tutup
            </Button> */}
            {/* <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => {
            console.log("data transaction:", values);
            console.log("wbTransaction:", wbTransaction);
          }}
        >
          Debugging
        </Button> */}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TransactionPksCancelOut;
