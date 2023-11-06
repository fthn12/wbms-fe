import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";
import { useConfig } from "../../../hooks";
import format from "date-fns/format";
import moment from "moment";

const ViewTransaction = ({ isViewOpen, onClose, dtTransaction }) => {
  console.log(dtTransaction, "data transaksi");
  const { WBMS, SCC_MODEL } = useConfig();
  const [originWeightNetto, setOriginWeightNetto] = useState(0);
  const [returnWeightNetto, setReturnWeightNetto] = useState(0);

  useEffect(() => {
    //OriginWeightNetto
    if (dtTransaction?.originWeighInKg && dtTransaction?.originWeighOutKg) {
      let total =
        Math.abs(dtTransaction.originWeighInKg - dtTransaction.originWeighOutKg) -
        dtTransaction.potonganWajib -
        dtTransaction.potonganLain;
      setOriginWeightNetto(total);
    } else {
      setOriginWeightNetto(0);
    }
  }, [dtTransaction]);

  useEffect(() => {
    //ReturnWeightNetto
    if (dtTransaction?.returnWeighInKg && dtTransaction?.returnWeighOutKg) {
      let total = Math.abs(dtTransaction.returnWeighInKg - dtTransaction.returnWeighOutKg);
      setReturnWeightNetto(total);
    } else {
      setReturnWeightNetto(0);
    }
  }, [dtTransaction]);

  return (
    <Dialog open={isViewOpen} fullWidth maxWidth="lg" onClose={() => onClose("", false)}>
      <DialogTitle sx={{ color: "white", backgroundColor: "black", fontSize: "30px" }}>
        Detail Transaksi
        <IconButton
          sx={{
            color: "white",
            position: "absolute",
            right: "10px",
            top: "15px",
          }}
          onClick={() => {
            onClose("", false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Formik initialValues={dtTransaction}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                padding={2}
                paddingBottom={5}
                mx={3}
                gap="20px"
                gridTemplateColumns="repeat(12, minmax(0, 1fr))"
              >
                <FormControl sx={{ gridColumn: "span 5" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    NO Bontrip
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="bonTripNo"
                    value={values?.bonTripNo || ""}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Nomor Polisi
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="transportVehiclePlateNo"
                    value={values?.transportVehiclePlateNo || ""}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Nama Supir
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="driverName"
                    value={values?.driverName || ""}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    NO DO
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="deliveryOrderNo"
                    value={values?.deliveryOrderNo || ""}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Nama Vendor/Transporter
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="transporterCompanyName"
                    value={values?.transporterCompanyName || ""}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Produk
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="productName"
                    value={values?.productName || ""}
                    inputProps={{ readOnly: true }}
                  />

                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Sertifikasi Truk
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="vehicleAllowableSccModel"
                    value={SCC_MODEL[values?.vehicleAllowableSccModel || 0]}
                    inputProps={{ readOnly: true }}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Berat Masuk - IN
                  </FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    name="originWeighInKg"
                    value={values?.originWeighInKg > 0 ? values.originWeighInKg.toFixed(2) : "0.00"}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Berat Keluar - OUT
                  </FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    name="originWeighOutKg"
                    value={values?.originWeighOutKg > 0 ? values.originWeighOutKg.toFixed(2) : "0.00"}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL
                  </FormLabel>

                  <TextField
                    type="number"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    name="weightNetto"
                    value={originWeightNetto > 0 ? originWeightNetto.toFixed(2) : "0.00"}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "17px",
                      mt: 2,
                      fontWeight: "bold",
                    }}
                  >
                    Return Berat Masuk - IN
                  </FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    name="returnWeighInKg"
                    value={values?.returnWeighInKg > 0 ? values.returnWeighInKg.toFixed(2) : "0.00"}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Return Berat Keluar - OUT
                  </FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    name="returnWeighOutKg"
                    value={values?.returnWeighOutKg > 0 ? values.returnWeighOutKg.toFixed(2) : "0.00"}
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    TOTAL Return
                  </FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    name="weightNetto"
                    value={returnWeightNetto > 0 ? returnWeightNetto.toFixed(2) : "0.00"}
                    inputProps={{ readOnly: true }}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 3" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Waktu Berat Masuk - IN
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="originWeighInTimestamp"
                    value={
                      values?.originWeighInTimestamp
                        ? moment(values.originWeighInTimestamp).format("DD MMM YYYY HH:mm")
                        : ""
                    }
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Waktu Berat Keluar - OUT
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="originWeighOutTimestamp"
                    value={
                      values?.originWeighOutTimestamp
                        ? moment(values.originWeighOutTimestamp).format("DD MMM YYYY HH:mm")
                        : ""
                    }
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "17px",
                      fontWeight: "bold",
                      mt: 14.5,
                    }}
                  >
                    Waktu Return Berat Masuk - IN
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="returnWeighInTimestamp"
                    value={
                      values?.returnWeighInTimestamp
                        ? moment(values.returnWeighInTimestamp).format("DD MMM YYYY HH:mm")
                        : ""
                    }
                    inputProps={{ readOnly: true }}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      mt: 2,
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                  >
                    Waktu Return Berat Keluar - OUT
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "whitesmoke" }}
                    name="returnWeighOutTimestamp"
                    value={
                      values?.returnWeighOutTimestamp
                        ? moment(values.returnWeighOutTimestamp).format("DD MMM YYYY HH:mm")
                        : ""
                    }
                    inputProps={{ readOnly: true }}
                  />
                </FormControl>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTransaction;
