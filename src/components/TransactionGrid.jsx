import { useEffect, useMemo, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import dayjs from "dayjs";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.min.css"; // Optional theme CSS
import { ModuleRegistry } from "@ag-grid-community/core";
import * as moment from "moment";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { useConfig, useTransaction } from "../hooks";
import QRCodeViewer from "./QRCodeViewer";

ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]);

const TransactionGrid = (props) => {
  const { selectedStartDate, selectedEndDate, selectedStatus, setSelectedStartDate, setSelectedEndDate, statusFilter } =
    props;
  const { WBMS, PKS_PROGRESS_STATUS, T30_PROGRESS_STATUS, BULKING_PROGRESS_STATUS } = useConfig();
  const { wbTransaction, useSearchManyTransactionQuery } = useTransaction();

  // const [searchMany, results] = useSearchManyMutation();
  // Number.isNaN(+message.data) ? 0 : +message.data;
  // var now = new Date();
  // var WH = Number.isNaN(+WBMS.SITE_WORKING_HOUR) ? 0 : +WBMS.SITE_WORKING_HOUR;
  // var WM = Number.isNaN(+WBMS.SITE_WORKING_MINUTE) ? 0 : +WBMS.SITE_WORKING_MINUTE;

  // console.log("now:", now);
  // console.log("WH:", WH);
  // console.log("moment:", moment().format());
  // console.log("moment substract:", moment().subtract(1, "hours").format());
  // if (now.getHours() < WH) {
  //   console.log("less then");
  // } else if (now.getHours() === WH) {
  // } else {
  // }

  const data = {
    where: {
      typeSite: +WBMS.SITE_TYPE,
      OR: [
        {
          dtModified: { gte: moment().subtract(1, "hours").format() },
        },
        {
          progressStatus: { in: [1, 6, 11] },
        },
      ],
    },
    orderBy: { bonTripNo: "desc" },
  };

  const { data: results, refetch } = useSearchManyTransactionQuery(data);

  // useEffect(() => {
  //   if (results?.data?.transaction?.records) {
  //     const filteredData = results?.data?.transaction?.records.filter((transaction) => {
  //       const transactionData = Object.values(transaction).join(" ").toLowerCase();
  //       return transactionData.includes(searchQuery.toLowerCase());
  //     });
  //     setFilteredData(filteredData);
  //   }
  // }, [results]);

  const dtTransaction = useMemo(() => {
    let filteredData = results?.data?.transaction?.records || [];

    filteredData = filteredData.filter((transaction) => {
      const transactionDate = dayjs(transaction.dtCreated);
      const startDate = dayjs(selectedStartDate).startOf("day");
      const endDate = dayjs(selectedEndDate).endOf("day");
      const date = transactionDate.isBetween(startDate, endDate, "day", "[]");
      const status = selectedStatus
        ? statusFilter(selectedStatus).includes(String(transaction.progressStatus).toLowerCase())
        : true;

      return date && status;
    });

    return filteredData;
  }, [results, selectedStartDate, selectedEndDate, selectedStatus]);

  const today = dayjs();

  useEffect(() => {
    setSelectedStartDate(today);
    setSelectedEndDate(today);

    // console.clear();

    return () => {
      // console.clear();
    };
  }, []);

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
        {params.data && <QRCodeViewer wbTransaction={params.data} type="grid" />}
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
      headerName: "STATUS",
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
      // flex: 1,
    }),
    [],
  );

  useEffect(() => {
    refetch();
  }, [wbTransaction]);

  return (
    <Box
      className="ag-theme-balham"
      sx={{ "& .ag-header-cell-label": { justifyContent: "center" }, width: "auto", height: "69vh" }}
    >
      <AgGridReact
        rowData={dtTransaction} // Row Data for Rows
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
        // rowHeight="33"
      />
    </Box>
  );
};

export default TransactionGrid;
