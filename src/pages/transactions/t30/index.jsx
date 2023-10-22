import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Grid, Paper } from "@mui/material";
import { toast } from "react-toastify";

import Header from "../../../components/layout/signed/Header";
import QRCodeScanner from "../../../components/QRCodeScanner";
import ProgressStatus from "../../../components/ProgressStatus";
import TransactionGrid from "../../../components/TransactionGrid";

import * as TransactionAPI from "../../../apis/transactionApi";

import { useConfig, useTransaction } from "../../../hooks";

const T30Transaction = () => {
  const navigate = useNavigate();

  const { WBMS } = useConfig();
  const { wbTransaction, setWbTransaction, clearWbTransaction } = useTransaction();

  const handleCloseQRCodeScanner = async (codeContent, readEnter) => {
    if (codeContent?.trim().length > 10) {
      try {
        const data = { content: codeContent.trim(), typeSite: WBMS.SITE_TYPE };

        const response = await TransactionAPI.eDispatchFindOrCreateByQrcode(data);

        console.log("response:", response);

        if (!response?.status) {
          throw new Error(response?.message);
        }

        console.log("vStatus:", response.data.draftTransaction.vehicleStatus);
        console.log("dStatus:", response.data.draftTransaction.deliveryStatus);

        setWbTransaction(response.data.draftTransaction);

        navigate(response.data.urlPath);
      } catch (error) {
        toast.error(`${error.message}.`);
        return;
      }
    } else if (readEnter) {
      return toast.error("Tidak dapat membaca QR Code atau QR Code tidak valid...");
    }
  };

  useEffect(() => {
    // navigate dari child (content didalam Outlet) tidak merunning useEffect ini
    // console.clear();
    clearWbTransaction();

    return () => {
      // console.clear();
    };
  }, []);

  return (
    <Box mt={4}>
      <Header title="Transaksi T30" subtitle={`Transaksi WBMS pada T30`} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs="auto">
              <Paper sx={{ p: 2, ml: 1, width: "220px", minHeight: "37vh" }}>
                <ProgressStatus />
                <QRCodeScanner onCloseHandler={handleCloseQRCodeScanner} />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper
                sx={{
                  p: 2,
                  mr: 1,
                  minHeight: "37vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!wbTransaction && <Box>DSN WBMS</Box>}
                <Outlet />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mx: 1 }}>
            <TransactionGrid />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default T30Transaction;
