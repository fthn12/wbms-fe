import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Paper, Button } from "@mui/material";

import Header from "../../components/layout/signed/HeaderTransaction";
import TransactionGrid from "../../components/TransactionGrid";

import { useTransaction, useApp } from "../../hooks";

const TransactionPks = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const { setSidebar } = useApp();
  const { clearWbTransaction } = useTransaction();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    // navigate dari child (content didalam Outlet) tidak merunning useEffect ini
    // console.clear();
    clearWbTransaction();

    if (+type === 1) {
      setSidebar({ selected: "Transaksi WB PKS" });

      setTitle("Transaksi PKS");
      setSubtitle("Transaksi WBMS pada PKS");
    } else if (+type === 2) {
      setSidebar({ selected: "Transaksi WB T30" });

      setTitle("Transaksi T30");
      setSubtitle("Transaksi WBMS pada T30");
    } else if (+type === 3) {
      setSidebar({ selected: "Transaksi WB Bulking" });

      setTitle("Transaksi Bulking");
      setSubtitle("Transaksi WBMS pada Bulking");
    } else {
      navigate("wb/404");
    }

    return () => {
      // console.clear();
    };
  }, []);

  return (
    <Box>
      <Header title={title} subtitle={subtitle} />

      <Box display="flex" sx={{ mt: 3 }}>
        <Box flex={1}></Box>
        <Button variant="contained" onClick={() => {}}>
          Buat Baru
        </Button>
        <Button variant="contained" sx={{ ml: 0.5 }} onClick={() => {}}>
          Cari No POL
        </Button>
      </Box>

      <Paper sx={{ mt: 1, p: 2, minHeight: "72vh" }}>
        <TransactionGrid />
      </Paper>
    </Box>
  );
};

export default TransactionPks;
