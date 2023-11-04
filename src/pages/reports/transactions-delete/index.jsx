import { useMemo, useState, useEffect } from "react";
import { Box, Button, Paper, TextField, FormControl, Autocomplete } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.min.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.min.css"; // Optional theme CSS
import { ModuleRegistry } from "@ag-grid-community/core";
import * as moment from "moment";
import { useRef } from "react";
import BonTripPrint from "../../../components/BonTripT30Print";
import Header from "../../../components/layout/signed/Header";
import { useConfig, useTransaction, useApp, useProduct, useTransportVehicle, useCompany } from "../../../hooks";
ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]);

const ReportTransactionDaily = () => {
  const { setSidebar } = useApp();
  const { WBMS, PKS_PROGRESS_STATUS, T30_PROGRESS_STATUS, BULKING_PROGRESS_STATUS } = useConfig();
  const { useSearchManyTransactionQuery } = useTransaction();
  const { useGetProductQuery } = useProduct();
  const { useGetTransportVehiclesQuery } = useTransportVehicle();
  const { useGetCompanyQuery } = useCompany();

  const gridRef = useRef();

  const data = {
    where: {
      typeSite: +WBMS.SITE_TYPE,
      progressStatus: { in: [4, 5, 14] },
      isDeleted: false,
    },
    orderBy: { bonTripNo: "desc" },
  };

  useEffect(() => {
    setSidebar({ selected: "Transaksi Harian" });
  }, []);

  const { data: dtTransaction, refetch: refetchDtTransaction } = useSearchManyTransactionQuery(data);
  const { data: dtProduct } = useGetProductQuery();
  const { data: dtTransportVehicle } = useGetTransportVehiclesQuery();
  const { data: dtCompany } = useGetCompanyQuery();

  const statusFormatter = (params) => {
    if (WBMS.SITE_TYPE === "1") return PKS_PROGRESS_STATUS[params.value];
    else if (WBMS.SITE_TYPE === "2") return T30_PROGRESS_STATUS[params.value];
    else if (WBMS.SITE_TYPE === "3") return BULKING_PROGRESS_STATUS[params.value];
  };

  const dateFormatter = (params) => {
    return moment(params.value).format("DD MMM YYYY").toUpperCase();
  };

  const timeFormatter = (params) => {
    return moment(params.value).format("hh:mm");
  };
  const actionsRenderer = (params) => {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {params.data && (
          <Button variant="contained" size="small" sx={{ m: "1px" }}>
            View
          </Button>
        )}
      </Box>
    );
  };

  const [columnDefs] = useState([
    {
      headerName: "ACTIONS",
      field: "id",
      width: 100,
      cellRenderer: actionsRenderer,
      sortable: false,
      resizable: false,
      filter: false,
      pinned: "left",
      lockPinned: true,
    },
    { headerName: "NO BONTRIP", field: "bonTripNo", hide: true },
    { headerName: "NOPOL", field: "transportVehiclePlateNo", maxWidth: 100 },
    {
      headerName: "Status",
      field: "progressStatus",
      valueFormatter: statusFormatter,
      enableRowGroup: true,
      rowGroup: true,
      hide: true,
    },
    { headerName: "NO DO", field: "deliveryOrderNo", cellStyle: { textAlign: "center" }, maxWidth: 200 },
    { headerName: "PRODUK", field: "productName", cellStyle: { textAlign: "center" }, maxWidth: 110 },
    { headerName: "WB-IN", field: "originWeighInKg", maxWidth: 110, cellStyle: { textAlign: "right" } },
    { headerName: "WB-OUT", field: "originWeighOutKg", maxWidth: 110, cellStyle: { textAlign: "right" } },
    { headerName: "RETUR WB-IN", field: "returnWeighInKg", maxWidth: 150, cellStyle: { textAlign: "right" } },
    { headerName: "RETUR WB-OUT", field: "returnWeighOutKg", maxWidth: 150, cellStyle: { textAlign: "right" } },
    {
      headerName: "WAKTU",
      field: "dtModified",
      maxWidth: 110,
      cellStyle: { textAlign: "center" },
      valueFormatter: timeFormatter,
    },
    {
      headerName: "TANGGAL",
      field: "dtModified",
      maxWidth: 120,
      cellStyle: { textAlign: "center" },
      valueFormatter: dateFormatter,
    },
  ]);

  const defaultColDef = {
    sortable: true,
    resizable: true,
    floatingFilter: false,
    filter: true,
    enableRowGroup: false,
    rowGroup: false,
  };

  // never changes, so we can use useMemo
  const autoGroupColumnDef = useMemo(
    () => ({
      cellRendererParams: {
        suppressCount: false,
        checkbox: false,
      },
      field: "bonTripNo",
      headerName: "STATUS",
      minWidth: "250",
      flex: 1,
    }),
    [],
  );
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedPlateNo, setSelectedPlateNo] = useState("");
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

  const filtered = useMemo(() => {
    let filteredData = dtTransaction?.data?.transaction?.records || [];

    filteredData = filteredData.filter((transaction) => {
      const productName = transaction.productName.toLowerCase().includes(selectedProduct.toLowerCase());
      const vendor = transaction.transporterCompanyName.toLowerCase().includes(selectedVendor.toLowerCase());
      const plateNo = transaction.transportVehiclePlateNo.toLowerCase().includes(selectedPlateNo.toLowerCase());
      const transactionDate = dayjs(transaction.dtCreated);
      const startDate = dayjs(selectedStartDate).startOf("day");
      const endDate = dayjs(selectedEndDate).endOf("day");
      const date = transactionDate.isBetween(startDate, endDate, "day", "[]");
      const status = selectedStatus
        ? statusFilter(selectedStatus).includes(String(transaction.progressStatus).toLowerCase())
        : true;

      return productName && vendor && plateNo && date && status;
    });

    return filteredData;
  }, [
    dtTransaction,
    selectedProduct,
    selectedVendor,
    selectedPlateNo,
    selectedStartDate,
    selectedEndDate,
    selectedStatus,
  ]);

  const today = dayjs();

  useEffect(() => {
    setSelectedStartDate(today);
    setSelectedEndDate(today);

    // console.clear();

    return () => {
      // console.clear();
    };
  }, []);

  return (
    <Box>
      <Header title="LAPORAN TRANSAKSI DIHAPUS" subtitle="Laporan Transaksi Yang Dihapus" />

      <Box display="flex" sx={{ mt: 1 }}>
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
            value={selectedProduct}
            onChange={(event, newValue) => {
              setSelectedProduct(newValue || "");
            }}
            options={dtProduct?.data?.product?.records?.map((item) => item.name) || []}
            renderInput={(params) => <TextField {...params} label="Pilih Product" variant="outlined" size="small" />}
            sx={{
              color: selectedProduct === "" ? "gray" : "black",
              fontSize: "15px",
              mt: "auto",
              mr: "10px",
              minWidth: 150,
            }}
          />
        </FormControl>

        <FormControl sx={{ mt: "auto", minWidth: 190 }} size="small">
          <Autocomplete
            value={selectedPlateNo}
            onChange={(event, newValue) => {
              setSelectedPlateNo(newValue || "");
            }}
            options={dtTransportVehicle?.data?.transportVehicle?.records?.map((item) => item.plateNo) || []}
            renderInput={(params) => <TextField {...params} label="Pilih No Pol" variant="outlined" size="small" />}
            sx={{
              color: selectedPlateNo === "" ? "gray" : "black",
              fontSize: "15px",
              mt: "auto",
              mr: "10px",
              minWidth: 150,
            }}
          />
        </FormControl>
        <FormControl sx={{ mt: "auto", minWidth: 190 }} size="small">
          <Autocomplete
            value={selectedVendor}
            onChange={(event, newValue) => {
              setSelectedVendor(newValue || "");
            }}
            options={dtCompany?.data?.company?.records?.map((item) => item.name) || []}
            renderInput={(params) => <TextField {...params} label="Pilih Vendor" variant="outlined" size="small" />}
            sx={{
              color: selectedVendor === "" ? "gray" : "black",
              fontSize: "15px",
              mt: "auto",
              mr: "10px",
              minWidth: 150,
            }}
          />
        </FormControl>

        <FormControl sx={{ mt: "auto", minWidth: 190 }} size="small">
          <Autocomplete
            value={selectedStatus}
            onChange={(event, newValue) => {
              setSelectedStatus(newValue); // Memperbarui selectedStatus saat status dipilih
            }}
            options={statusFilter("")}
            getOptionLabel={(status) => status}
            renderInput={(params) => <TextField {...params} label="Pilih Status" variant="outlined" size="small" />}
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
          <Button variant="contained" onClick={() => gridRef.current.api.exportDataAsExcel()}>
            Export Excel
          </Button>
          <Button variant="contained" sx={{ ml: 0.5 }} onClick={() => refetchDtTransaction()}>
            Reload
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mt: 1, p: 2, minHeight: "77vh" }}>
        <Box
          className="ag-theme-balham"
          sx={{ "& .ag-header-cell-label": { justifyContent: "center" }, width: "auto", height: "75.5vh" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={filtered} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            rowGroupPanelShow="always"
            enableRangeSelection="true"
            groupSelectsChildren="true"
            suppressRowClickSelection="true"
            autoGroupColumnDef={autoGroupColumnDef}
            pagination="true"
            paginationAutoPageSize="true"
            groupDefaultExpanded="1"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ReportTransactionDaily;
