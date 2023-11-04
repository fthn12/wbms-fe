import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Paper, Button, TextField, FormControl, Autocomplete } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Header from "../../components/layout/signed/HeaderTransaction";
import TransactionGrid from "../../components/TransactionGrid";

import { useTransaction, useApp, useConfig } from "../../hooks";

const TransactionPks = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { WBMS, PKS_PROGRESS_STATUS, T30_PROGRESS_STATUS, BULKING_PROGRESS_STATUS } = useConfig();
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

  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusFilter = (inputValue) => {
    if (!inputValue || inputValue.trim() === "") {
      if (WBMS.SITE_TYPE === "1") {
        return Object.keys(PKS_PROGRESS_STATUS).map((key) => PKS_PROGRESS_STATUS[key]);
      } else if (WBMS.SITE_TYPE === "2") {
        return Object.keys(T30_PROGRESS_STATUS).map((key) => T30_PROGRESS_STATUS[key]);
      } else if (WBMS.SITE_TYPE === "3") {
        return Object.keys(BULKING_PROGRESS_STATUS).map((key) => BULKING_PROGRESS_STATUS[key]);
      }
    }

    // Gunakan metode filter() untuk mencocokkan nama status dengan nilai input
    let filteredStatus = [];
    if (WBMS.SITE_TYPE === "1") {
      filteredStatus = Object.keys(PKS_PROGRESS_STATUS).filter((key) =>
        PKS_PROGRESS_STATUS[key].toLowerCase().includes(inputValue.toLowerCase()),
      );
    } else if (WBMS.SITE_TYPE === "2") {
      filteredStatus = Object.keys(T30_PROGRESS_STATUS).filter((key) =>
        T30_PROGRESS_STATUS[key].toLowerCase().includes(inputValue.toLowerCase()),
      );
    } else if (WBMS.SITE_TYPE === "3") {
      filteredStatus = Object.keys(BULKING_PROGRESS_STATUS).filter((key) =>
        BULKING_PROGRESS_STATUS[key].toLowerCase().includes(inputValue.toLowerCase()),
      );
    }

    return filteredStatus;
  };

  return (
    <Box>
      <Header title={title} subtitle={subtitle} />

      <Box display="flex" sx={{ mt: 1 }}>
        {/* <Box borderRadius="5px" ml={1} border="solid grey 1px">
          <InputBase
            sx={{ ml: 2, flex: 2, fontSize: "13px" }}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon sx={{ mr: "3px", fontSize: "19px" }} />
          </IconButton>
        </Box> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Dari Tanggal"
            // maxDate={today}
            className="custom-datetimepicker"
            value={selectedStartDate}
            onChange={(date) => {
              setSelectedStartDate(date);
            }}
          />
          <DatePicker
            label="Sampai Tanggal"
            className="custom-datetimepicker"
            // maxDate={today}
            value={selectedEndDate}
            onChange={(date) => {
              setSelectedEndDate(date);
            }}
          />
        </LocalizationProvider>

        <FormControl sx={{ mt: "auto", minWidth: 190 }} size="small">
          <Autocomplete
            value={selectedStatus}
            onChange={(event, newValue) => {
              setSelectedStatus(newValue); // Memperbarui selectedStatus saat status dipilih
            }}
            options={statusFilter("")}
            getOptionLabel={(status) => status}
            renderInput={(params) => (
              <TextField {...params} label="Pilih Status" variant="outlined" size="small" />
            )}
            sx={{
              color: selectedStatus === "" ? "gray" : "black",
              fontSize: "15px",
              mt: "auto",
              mr: "10px",
              minWidth: 150,
            }}
          />
        </FormControl>
        <Box ml="auto" mt="auto">
          <Button variant="contained" onClick={() => {}}>
            Buat Baru
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mt: 1, p: 2, minHeight: "72vh" }}>
        <TransactionGrid
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          selectedStatus={selectedStatus}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          statusFilter={statusFilter}
        />
      </Paper>
    </Box>
  );
};

export default TransactionPks;
