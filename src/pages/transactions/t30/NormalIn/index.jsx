import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, InputAdornment, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { toast } from "react-toastify";
import moment from "moment";

import QRCodeViewer from "../../../../components/QRCodeViewer";

import { useForm } from "../../../../utils/useForm";
import * as TransactionAPI from "../../../../apis/transactionApi";
import * as eDispatchApi from "../../../../apis/eDispatchApi";

import { useAuth, useConfig, useTransaction, useWeighbridge } from "../../../../hooks";
import { useProduct, useSite, useStorageTank, useTransportVehicle } from "../../../../hooks";

const TransactionT30WbInNormal = (props) => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { WBMS, SCC_MODEL, VA_SCC_MODEL, RSPO_SCC_MODEL, ISCC_SCC_MODEL } = useConfig();
  const { wbTransaction, setWbTransaction, clearWbTransaction } = useTransaction();
  const { wb } = useWeighbridge();

  const { useGetProductsQuery } = useProduct();
  const { useGetSitesQuery } = useSite();
  const { useSearchManyStorageTanksQuery } = useStorageTank();
  const { useGetTransportVehiclesQuery } = useTransportVehicle();

  const T30Site = eDispatchApi.getT30Site();

  const storageTankFilter = {
    where: {
      OR: [{ siteId: T30Site.id }, { siteRefId: T30Site.id }],
      refType: 1,
    },
  };

  const { data: dtProducts } = useGetProductsQuery();
  const { data: dtDestinationSites } = useGetSitesQuery();
  const { data: dtStorageTanks } = useSearchManyStorageTanksQuery(storageTankFilter);
  const { data: dtTransportVehicles } = useGetTransportVehiclesQuery();

  const { values, setValues, handleInputChange } = useForm({
    ...TransactionAPI.InitialData,
  });

  const [originWeightNetto, setOriginWeightNetto] = useState(0);

  const [canSubmit, setCanSubmit] = useState(false);

  const [dtVaScc, setDtVaScc] = useState(VA_SCC_MODEL);
  const [dtRspoScc, setDtRspoScc] = useState(RSPO_SCC_MODEL);
  const [dtIsccScc, setDtIsccScc] = useState(ISCC_SCC_MODEL);

  const handleClose = () => {
    clearWbTransaction();

    navigate("/wb/transaction-t30");
  };

  const handleSubmit = async () => {
    let tempTrans = { ...values };

    try {
      // tempTrans.originWeighInTimestamp = SemaiUtils.GetDateStr();
      tempTrans.originWeighInTimestamp = moment().toDate();
      tempTrans.originWeighInOperatorName = user.name;

      const data = { wbTransaction: { ...tempTrans } };

      const response = await TransactionAPI.eDispatchT30WbInNormalAfter(data);

      if (!response.status) {
        throw new Error(response?.message);
      }

      setWbTransaction(response.data.transaction);
      setValues({ ...response.data.transaction });

      toast.success(`Transaksi WB-IN telah tersimpan.`);
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

    setValues(wbTransaction);

    return () => {
      // console.clear();
    };
  }, []);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      originWeighInKg: wb.weight,
    }));
  }, [wb.weight]);

  useEffect(() => {
    if (values.originWeighInKg < WBMS.WBMS_WB_MIN_WEIGHT || values.originWeighOutKg < WBMS.WBMS_WB_MIN_WEIGHT) {
      setOriginWeightNetto(0);
    } else {
      let total =
        Math.abs(values.originWeighInKg - values.originWeighOutKg) - values.potonganWajib - values.potonganLain;
      setOriginWeightNetto(total);
    }
  }, [values]);

  // Untuk validasi field
  useEffect(() => {
    let cSubmit = false;

    if (
      values.originWeighInKg >= WBMS.WBMS_WB_MIN_WEIGHT &&
      // values?.productId?.trim().length > 0 &&
      // values?.originSiteId?.trim().length > 0 &&
      values?.originSourceStorageTankId?.trim().length > 0 &&
      // values?.destinationSiteId?.trim().length > 0 &&
      values?.loadedSeal1?.trim().length > 0 &&
      values?.loadedSeal2?.trim().length > 0
    ) {
      cSubmit = true;
    }

    setCanSubmit(cSubmit);
  }, [WBMS.WBMS_WB_MIN_WEIGHT, values]);

  const handleCancelTransaction = (reason) => {
    console.log(`handleCancelTransaction:${reason}`);
  };

  let cbVaScc;
  cbVaScc = (
    <FormControl
      fullWidth
      size="small"
      sx={{
        mb: 2,
        backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
      }}
      required
    >
      <InputLabel id="vaScc">Vehicle Allowable SCC Model</InputLabel>
      <Select
        labelId="vaScc"
        label="Vehicle Allowable SCC Model"
        name="vehicleAllowableSccModel"
        value={values?.jsonData?.vehicleAllowableSccModel || 0}
        onChange={(e) => handleInputChange(e)}
        disabled={false}
      >
        <MenuItem value="">-</MenuItem>
        {dtVaScc &&
          dtVaScc.length > 0 &&
          dtVaScc?.map((data, index) => {
            return (
              <MenuItem key={index} value={data.id}>
                {data.value}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );

  let cbRspoScc;
  cbRspoScc = (
    <FormControl
      fullWidth
      size="small"
      sx={{
        mb: 2,
        backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
      }}
      required
    >
      <InputLabel id="rspoScc">RSPO SCC Model</InputLabel>
      <Select
        labelId="rspoScc"
        label="RSPO SCC Model"
        name="rspoSccModel"
        value={values?.jsonData?.rspoSccModel || 0}
        onChange={(e) => handleInputChange(e)}
        disabled={values.progressStatus !== 0}
      >
        <MenuItem value="">-</MenuItem>
        {dtRspoScc &&
          dtRspoScc.length > 0 &&
          dtRspoScc?.map((data, index) => {
            return (
              <MenuItem key={index} value={data.id}>
                {data.value}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );

  let cbIsccScc;
  cbIsccScc = (
    <FormControl
      fullWidth
      size="small"
      sx={{
        mb: 2,
        backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
      }}
      required
    >
      <InputLabel id="isccScc">ISCC SCC Model</InputLabel>
      <Select
        labelId="isccScc"
        label="ISCC SCC Model"
        name="isccSccModel"
        value={values?.jsonData?.isccSccModel || "0"}
        onChange={(e) => handleInputChange(e)}
        disabled={values.progressStatus !== 0}
      >
        <MenuItem value="">-</MenuItem>
        {dtIsccScc &&
          dtIsccScc.length > 0 &&
          dtIsccScc?.map((data, index) => {
            return (
              <MenuItem key={index} value={data.id}>
                {data.value}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );

  let cbStorageTanks;
  cbStorageTanks = (
    <FormControl fullWidth size="small" required>
      <InputLabel id="originSourceStorageTankId">Tangki Asal</InputLabel>
      <Select
        labelId="originSourceStorageTankId"
        label="Tangki Asal"
        name="originSourceStorageTankId"
        value={values?.originSourceStorageTankId || ""}
        onChange={(e) => {
          handleInputChange(e);

          let selected = dtStorageTanks?.data?.storageTank?.records?.filter((item) => item.id === e.target.value);

          if (selected) {
            setValues((prev) => {
              prev.originSourceStorageTankCode = selected[0].code;
              prev.originSourceStorageTankName = selected[0].name;
              return { ...prev };
            });
          }
        }}
        disabled={values.progressStatus !== 0}
      >
        <MenuItem value="">-</MenuItem>
        {dtStorageTanks?.data?.storageTank?.records &&
          dtStorageTanks?.data?.storageTank?.records.length > 0 &&
          dtStorageTanks?.data?.storageTank?.records.map((data, index) => (
            <MenuItem key={index} value={data.id}>
              {`[${data.siteName}] ${data.name} ${data.productName}`}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );

  let cbDestinationSites;
  cbDestinationSites = (
    <FormControl
      fullWidth
      size="small"
      sx={{
        mb: 2,
        backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
      }}
      required
    >
      <InputLabel id="destinationSiteId">Site Tujuan</InputLabel>
      <Select
        labelId="destinationSiteId"
        label="Site Tujuan"
        name="destinationSiteId"
        value={values?.destinationSiteId || ""}
        onChange={(e) => {
          handleInputChange(e);

          let selected = dtDestinationSites?.data?.site?.records?.filter((item) => item.id === e.target.value);

          if (selected) {
            setValues((prev) => {
              prev.jsonData.destinationSiteCode = selected[0].code;
              return { ...prev };
            });
          }
        }}
        disabled={values.progressStatus !== 0}
      >
        <MenuItem value="">-</MenuItem>
        {dtDestinationSites?.data?.site?.records &&
          dtDestinationSites?.data?.site?.records.length > 0 &&
          dtDestinationSites?.data?.site?.records?.map((data, index) => {
            return (
              <MenuItem key={index} value={data.id}>
                {`[${data.code}] ${data.name}`}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );

  let cbTransportVehicles;
  cbTransportVehicles = (
    <div
      className="mb-2"
      style={{
        backgroundColor: values.progressStatus !== 1 ? "whitesmoke" : "white",
      }}
    >
      <Select label="Truk" disabled={values.progressStatus !== 1}>
        {dtTransportVehicles?.data?.transportVehicle?.records?.map((data, index) => {
          return (
            <MenuItem id={data.id} key={index} value={data.id}>
              {`[${data.code}] ${data.name}`}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );

  let cbProducts;
  cbProducts = (
    <FormControl
      fullWidth
      size="small"
      sx={{
        mb: 1,
        backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
      }}
      required
    >
      <InputLabel id="productId">Produk</InputLabel>
      <Select
        labelId="productId"
        label="Produk"
        name="productId"
        value={values?.productId || ""}
        onChange={(e) => {
          handleInputChange(e);

          let selected = dtProducts?.data?.product?.records?.filter((item) => item.id === e.target.value);

          if (selected) {
            setValues((prev) => {
              prev.jsonData.productCode = selected[0].code;
              return { ...prev };
            });
          }
        }}
        disabled={values.progressStatus !== 0}
      >
        <MenuItem value="">-</MenuItem>
        {dtProducts?.data?.product?.records?.map((data, index) => {
          return (
            <MenuItem key={index} value={data.id}>
              {`[${data.code}] ${data.name}`}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2, backgroundColor: "whitesmoke" }}
          label="Nomor BON Trip"
          name="bonTripNo"
          value={values?.bonTripNo || ""}
        />

        <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Nama Supir"
              name="driverFullName"
              value={values?.driverName || ""}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="NIK"
              name="driverNik"
              value={values?.driverNik || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Nomor Polisi"
              name="transportVehiclePlateNo"
              value={values?.transportVehiclePlateNo || ""}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="SIM"
              name="driverFullName"
              value={values?.driverLicenseNo || ""}
            />
          </Grid>
        </Grid>

        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2, backgroundColor: "whitesmoke" }}
          label="Nama Vendor"
          name="transporterCompanyName"
          value={`${values?.transporterCompanyName} - ${values?.transporterCompanyCode}` || ""}
        />

        <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Kode Produk Kendaraan"
              name="transportVehicleProductCode"
              value={values?.transportVehicleProductCode || ""}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Kode Produk"
              name="productCode"
              value={values?.productCode || ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Nama Produk Kendaraan"
              name="transportVehicleProductName"
              value={values?.transportVehicleProductName || ""}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Nama Produk"
              name="productName"
              value={values?.productName || ""}
            />
          </Grid>
        </Grid>

        <TextField
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2, backgroundColor: "whitesmoke" }}
          label="Vehicle Allowable Scc Model"
          name="transportVehicleSccModel"
          value={SCC_MODEL[values?.transportVehicleSccModel || 0]}
        />

        {false && cbRspoScc}

        {false && cbIsccScc}

        {false && cbDestinationSites}

        {false && cbProducts}
      </Grid>
      <Grid item xs={3}>
        <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Segel 1 Saat Ini"
              name="currentSeal1"
              value={values?.currentSeal1 || ""}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
              }}
              required
              label="Segel Mainhole 1"
              name="loadedSeal1"
              value={values?.loadedSeal1 || ""}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
              }}
              required
              label="Segel Valve 1"
              name="loadedSeal2"
              value={values?.loadedSeal2 || ""}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Segel 2 Saat Ini"
              name="currentSeal2"
              value={values?.currentSeal2 || ""}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
              }}
              label="Segel Mainhole 2"
              name="loadedSeal3"
              value={values?.loadedSeal3 || ""}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: values.progressStatus !== 0 ? "whitesmoke" : "white",
              }}
              label="Segel Valve 2"
              name="loadedSeal4"
              value={values?.loadedSeal4 || ""}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          </Grid>
        </Grid>
        {cbStorageTanks}
      </Grid>
      <Grid item xs={3}>
        <Grid container columnSpacing={1}>
          <Grid item xs={5}>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="Berat Timbang Masuk"
              name="originWeighInKg"
              value={values?.originWeighInKg || 0}
            />
            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="Berat Timbang Keluar"
              name="originWeighOutKg"
              value={values?.originWeighOutKg || 0}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              type="datetime-local"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Waktu Timbang Masuk"
              name="originWeighInTimestamp"
              disabled
              value={values?.originWeighInTimestamp || "-"}
            />
            <TextField
              type="datetime-local"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              label="Waktu Timbang Keluar"
              name="originWeighOutTimestamp"
              disabled
              value={values?.originWeighOutTimestamp || "-"}
            />
          </Grid>
        </Grid>
        <Grid container columnSpacing={1}>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="Potongan Wajib Vendor"
              name="potonganWajib"
              value={values?.potonganWajib || 0}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2, backgroundColor: "whitesmoke" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
              label="Potongan Lainnya"
              name="potonganLain"
              value={values?.potonganLain || 0}
            />
          </Grid>
        </Grid>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ backgroundColor: "whitesmoke" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          label="TOTAL"
          name="weightNetto"
          value={originWeightNetto || 0}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1, mb: 1, height: 50 }}
          onClick={handleSubmit}
          disabled={!(canSubmit && values.progressStatus === 0 && wb?.isStable)}
        >
          Simpan
        </Button>

        <QRCodeViewer wbTransaction={wbTransaction} type="form" />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleClose}
          disabled={!(values.progressStatus === 1)}
        >
          Tutup
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => {
            console.log("data form:", values);
            console.log("wbTransaction:", wbTransaction);
            console.log("can submit:", canSubmit);
          }}
        >
          Debugging
        </Button>
      </Grid>

      <Grid item xs={3}>
        {/* others content */}
      </Grid>
    </Grid>
  );
};

export default TransactionT30WbInNormal;
