import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ModuleRegistry } from "@ag-grid-community/core";

import Header from "../../../components/layout/signed/Header";

import { useConfig, useProduct } from "../../../hooks";

ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]);

const MDProduct = () => {
  const { MD_SOURCE } = useConfig();
  const { useGetProductsQuery, useEDispatchProductSyncMutation } = useProduct();

  const { data: response, error, refetch } = useGetProductsQuery();
  const [eDispatchSync, results] = useEDispatchProductSyncMutation();

  const sourceFormatter = (params) => {
    return MD_SOURCE[params.value];
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
      field: "refType",
      headerName: "Source Master Data",
      valueFormatter: sourceFormatter,
      enableRowGroup: true,
      rowGroup: true,
      hide: true,
    },
    { field: "codeSap", headerName: "Kode SAP", maxWidth: 150, cellStyle: { textAlign: "center" } },
    // { field: "name", headerName: "Nama", flex: 1 },
    { field: "shortName", headerName: "Nama Pendek" },
    { field: "certification", headerName: "Sertifikasi" },
    { field: "description", headerName: "Deskripsi", flex: 2 },
    {
      field: "id",
      headerName: "Actions",
      maxWidth: 150,
      cellRenderer: actionsRenderer,
      pinned: "left",
      lockPinned: true,
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
      field: "name",
      // valueFormatter: sourceFormatter,
      minWidth: "250",
      // flex: 1,
      headerName: "Source Master Data",
    }),
    [],
  );

  if (error) console.log("error:", error);

  return (
    <Box>
      <Header title="PRODUCTS" subtitle="Master Data Produk" />
      <Box display="flex">
        <Box flex={1}></Box>
        <Button variant="contained" sx={{ mb: 1 }} onClick={() => eDispatchSync()}>
          Add
        </Button>
        <Button variant="contained" sx={{ mb: 1, ml: 0.5 }} onClick={() => eDispatchSync()}>
          eDispatch Sync
        </Button>
        <Button variant="contained" sx={{ mb: 1, ml: 0.5 }} onClick={() => refetch()}>
          Reload
        </Button>
      </Box>

      <Box
        className="ag-theme-alpine"
        sx={{ "& .ag-header-cell-label": { justifyContent: "center" }, width: "auto", height: "75vh" }}
      >
        <AgGridReact
          rowData={response?.data?.product?.records} // Row Data for Rows
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
          rowHeight="32"
        />
      </Box>
    </Box>
  );
};

export default MDProduct;
