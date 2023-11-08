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
import moment from "moment";
import * as XLSX from "xlsx-js-style";
import { useRef } from "react";
import Header from "../../../components/layout/signed/Header";
import ViewTransaction from "../../../components/viewTransaction";
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
  //filter date
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const filterStart = moment(selectedStartDate).hour(7).startOf("hour");
  const filterEnd = moment(selectedEndDate).add(1, "day").hour(6).endOf("hour");

  const data = {
    where: {
      typeSite: +WBMS.SITE_TYPE,
      progressStatus: { in: [4, 5, 14] },
      isDeleted: false,
      dtCreated: {
        gte: filterStart,
        lte: filterEnd,
      },
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

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const actionsRenderer = (params) => {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {params.data && (
          <Button
            variant="contained"
            size="small"
            sx={{ m: "1px" }}
            onClick={() => {
              setSelectedTransaction(params.data);
              setIsViewOpen(true);
            }}
          >
            View
          </Button>
        )}
      </Box>
    );
  };

  const statusFormatter = (params) => {
    if (WBMS.SITE_TYPE === "1") return PKS_PROGRESS_STATUS[params.value];
    else if (WBMS.SITE_TYPE === "2") return T30_PROGRESS_STATUS[params.value];
    else if (WBMS.SITE_TYPE === "3") return BULKING_PROGRESS_STATUS[params.value];
  };

  const dateFormatter = (params) => {
    if (params.data) {
      return moment(params.value).format("DD MMM YYYY").toUpperCase();
    }
    return "";
  };
  const dateGetter = (params) => {
    if (params.data) {
      return new Date(params.data.dtModified).toDateString();
    }
    return "";
  };
  const timeFormatter = (params) => {
    if (params.data) {
      return moment(params.value).format("HH:mm");
    }
    return "";
  };

  const NettoGetter = (params) => {
    if (params.data?.originWeighInKg && params.data?.originWeighOutKg) {
      const total =
        Math.abs(params.data?.originWeighInKg - params.data?.originWeighOutKg) -
        params.data?.potonganWajib -
        params.data?.potonganLain;
      return total;
    }
    return "";
  };
  const NumberFormatter = (params) => {
    if (params.data) return params.value ? params.value.toLocaleString("id-ID", { groupingSeparator: "." }) : 0;
    return "0";
  };

  const NettoRetur = (params) => {
    let total;
    if (params.data && params.data.returnWeighInKg && params.data.returnWeighOutKg) {
      total =
        Math.abs(params.data.returnWeighInKg - params.data.returnWeighOutKg) -
        params.data.potonganWajib -
        params.data.potonganLain;
    }

    return total;
  };

  const exportToExcel = async (gridApi) => {
    // Menyiapkan data untuk diekspor
    const selectedColumns = [
      "progressStatus",
      "bonTripNo",
      "transporterCompanyName",
      "transportVehiclePlateNo",
      "deliveryOrderNo",
      "productName",
      "originWeighInKg",
      "originWeighOutKg",
      "netto",
      "returnWeighInKg",
      "returnWeighOutKg",
      "netto2",
      "dtModified",
      "dtModified2",
    ];
    const exportData = gridApi.current.api.getDataAsCsv({
      columnKeys: selectedColumns,
      header: true,
      allColumns: true,
    });

    // Membuat workbook
    const wb = XLSX.read(exportData, { type: "binary", cellStyles: true, sheetStubs: true });
    const ws = wb.Sheets["Sheet1"];

    const range = XLSX.utils.decode_range(ws["!ref"]);
    const rowLength = range.e.r - range.s.r + 1;
    // ws[`I${rowLength + 2}`] = { t: "n", f: `SUM(H3:H${rowLength})`, F: `I${rowLength + 3}:I${rowLength + 3}` };

    ws["!cols"] = [
      { wch: 18 },
      { wch: 17 },
      { wch: 18 },
      { wch: 11 },
      { wch: 17 },
      { wch: 8 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 13 },
      { wch: 8 },
      { wch: 10 },
      { wch: 18 },
    ];
    const borderStyle = {
      top: { style: "thin" },
      right: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
    };
    const colName = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
    for (const itm of colName) {
      ws[itm + 1].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
        border: borderStyle,
      };
    }
    for (let j = "A".charCodeAt(0); j <= "N".charCodeAt(0); j++) {
      for (let i = 2; i <= rowLength; i++) {
        const a = `${String.fromCharCode(j)}${i}`;
        if (ws[a]?.v === 0) {
          ws[a].t = "s";
          ws[a].alignment = { horizontal: "right" };
        }
        if (ws[a] === undefined) {
          if (j === "A".charCodeAt(0)) ws[a] = { t: "s", v: "TOTAL" };
          else ws[a] = { t: "s", v: " " };
        }

        if (j >= "G".charCodeAt(0) && j <= "L".charCodeAt(0)) ws[a].z = "#,###";
        if (i === rowLength) {
          ws[a].s = {
            border: borderStyle,
          };
        } else {
          ws[a].s = {
            border: { right: { style: "thin" }, left: { style: "thin" } },
          };
        }
      }
    }
    ws[`A${rowLength}`].v = "SUBTOTAL";
    // Mengekspor workbook ke file Excel
    ws["!ref"] = `A1:N${rowLength + 2}`;
    await XLSX.writeFile(wb, "data.xlsx");
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
    { headerName: "NOPOL", field: "transportVehiclePlateNo", maxWidth: 90 },
    {
      headerName: "Status",
      field: "progressStatus",
      valueFormatter: statusFormatter,
      enableRowGroup: true,
      rowGroup: true,
      hide: true,
    },
    {
      headerName: "Nama Vendor/Cust.",
      field: "transporterCompanyName",
      width: 0,
      hide: true,
      suppressToolPanel: true,
    },
    { headerName: "NO DO", field: "deliveryOrderNo", cellStyle: { textAlign: "center" }, maxWidth: 140 },
    { headerName: "PRODUK", field: "productName", cellStyle: { textAlign: "center" }, maxWidth: 110 },
    {
      headerName: "WB-IN",
      field: "originWeighInKg",
      maxWidth: 110,
      cellStyle: { textAlign: "center" },

      cellRenderer: NumberFormatter,
    },

    {
      headerName: "WB-OUT",
      field: "originWeighOutKg",
      maxWidth: 110,
      cellStyle: { textAlign: "center" },
      valueParser: "Number(newValue)",
      // aggFunc: "sum",
      valueFormatter: NumberFormatter,
    },
    {
      headerName: "NETTO",
      field: "netto",
      maxWidth: 110,
      cellStyle: { textAlign: "center" },
      valueGetter: NettoGetter,
      valueParser: "Number(newValue)",
      valueFormatter: NumberFormatter,
      aggFunc: "sum",
      enableValue: true,
    },
    {
      headerName: "RETUR WB-IN",
      field: "returnWeighInKg",
      maxWidth: 120,
      cellStyle: { textAlign: "center" },
      valueParser: "Number(newValue)",
      valueFormatter: NumberFormatter,
    },
    {
      headerName: "RETUR WB-OUT",
      field: "returnWeighOutKg",
      maxWidth: 130,
      cellStyle: { textAlign: "center" },
      valueParser: "Number(newValue)",
      valueFormatter: NumberFormatter,
    },
    {
      headerName: "NETTO",
      field: "netto2",
      maxWidth: 120,
      cellStyle: { textAlign: "center" },
      valueGetter: NettoRetur,
      valueParser: "Number(newValue)",
      valueFormatter: NumberFormatter,
      aggFunc: "sum",
    },
    {
      headerName: "WAKTU",
      field: "dtModified",
      maxWidth: 90,
      cellStyle: { textAlign: "center" },
      valueFormatter: timeFormatter,
    },
    {
      headerName: "TANGGAL",
      field: "dtModified2",
      maxWidth: 110,
      cellStyle: { textAlign: "center" },
      valueGetter: dateGetter,
      valueFormatter: dateFormatter,
    },
  ]);
  const gridOptions = {
    groupIncludeFooter: true,
    groupIncludeTotalFooter: true,
    footerValueGetter: function (params) {
      let sum = 0;
      params.values.forEach((value) => {
        sum += value;
      });
      return sum;
    },
    groupRowAggNodes: true,
  };

  const defaultColDef = {
    sortable: true,
    resizable: true,
    floatingFilter: false,
    filter: true,
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
      const status = selectedStatus
        ? statusFilter(selectedStatus).includes(String(transaction.progressStatus).toLowerCase())
        : true;
      return productName && vendor && plateNo && status;
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
    const startOfToday = today.startOf("day").hour(7);
    const startDateTime = today.isAfter(startOfToday) ? startOfToday : startOfToday.subtract(1, "day");
    const endDateTime = startOfToday;

    setSelectedStartDate(startDateTime);
    setSelectedEndDate(endDateTime);

    // Bersihkan konsol jika diperlukan
    // console.clear();

    return () => {
      // console.clear();
    };
  }, []);

  return (
    <Box>
      <Header title="LAPORAN TRANSAKSI" subtitle="Laporan Transaksi Harian" />

      <Box display="flex" sx={{ mt: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Dari Tanggal"
            // maxDate={today}
            className="custom-datetimepicker"
            value={selectedStartDate}
            onChange={(date) => {
              const formattedDate = dayjs(date).startOf("day").hour(7).toDate();
              setSelectedStartDate(formattedDate);
            }}
          />
          <DatePicker
            label="Sampai Tanggal"
            className="custom-datetimepicker"
            // maxDate={today}
            value={selectedEndDate}
            onChange={(date) => {
              const formattedDate = dayjs(date).startOf("day").hour(7).toDate();
              setSelectedEndDate(formattedDate);
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
          <Button variant="contained" onClick={() => exportToExcel(gridRef)}>
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
            gridOptions={gridOptions}
            suppressRowClickSelection="true"
            autoGroupColumnDef={autoGroupColumnDef}
            pagination="true"
            paginationAutoPageSize="true"
            groupDefaultExpanded="1"
          />
        </Box>
      </Paper>
      <ViewTransaction
        isViewOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        dtTransaction={selectedTransaction}
      />
    </Box>
  );
};

export default ReportTransactionDaily;
