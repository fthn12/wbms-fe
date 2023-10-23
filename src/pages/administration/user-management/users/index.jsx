import { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-enterprise";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ModuleRegistry } from "@ag-grid-community/core";

import PlagiarismOutlinedIcon from "@mui/icons-material/PlagiarismOutlined";

import Header from "../../../../components/layout/signed/Header";

import { useConfig, useUser } from "../../../../hooks";

ModuleRegistry.registerModules([ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule]);

const UMUser = () => {
  const navigate = useNavigate();

  const { ROLES } = useConfig();
  const { useGetUsersQuery } = useUser();

  const { data: dataUser, error, refetch } = useGetUsersQuery();

  const sourceFormatter = (params) => {
    let value = "-";

    // const filteredRoles = ROLES.filter((role) => role.id === +params.value);
    const findRole = ROLES.find((role) => role.id === +params.value);

    if (findRole) value = findRole.value;

    return value;
  };

  const actionsRenderer = (params) => {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        {params.data && (
          <IconButton size="small" onClick={() => navigate(`/wb/administration/users/${params.data.id}`)}>
            <PlagiarismOutlinedIcon />
          </IconButton>
        )}
      </Box>
    );
  };

  const [columnDefs] = useState([
    {
      field: "role",
      headerName: "ROLE Type",
      valueFormatter: sourceFormatter,
      enableRowGroup: true,
      rowGroup: true,
      hide: true,
      resizable: true,
    },
    { field: "username", resizable: true, headerName: "Username", maxWidth: 150, cellStyle: { textAlign: "left" } },
    // { field: "name", headerName: "Nama", flex: 1 },
    { field: "division", resizable: true, headerName: "Divisi", cellStyle: { textAlign: "center" } },
    { field: "position", resizable: true, headerName: "Posisi" },
    { field: "phone", resizable: true, headerName: "Telephone" },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "id",
      headerName: "Actions",
      maxWidth: 150,
      cellRenderer: actionsRenderer,
      pinned: "right",
      lockPinned: true,
    },
  ]);

  const defaultColDef = {
    sortable: true,

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
      sort: "asc",
      // flex: 1,
      headerName: "ROLE Type",
    }),
    [],
  );

  if (error) console.log("error:", error);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (dataUser?.data?.user?.records) {
      const filteredData = dataUser?.data?.user?.records.filter((user) => {
        const userData = Object.values(user).join(" ").toLowerCase();
        return userData.includes(searchQuery.toLowerCase());
      });
      setFilteredData(filteredData);
    }
  }, [dataUser, searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [refetch]);

  return (
    <Box m="20px">
      <Paper
        sx={{
          p: 3,
          mx: 3,
          mb: 3,
          mt: 2,
          borderTop: "5px solid #000",
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        {/* <Box display="flex" my={2}>
          <Box ml="auto">
            <Button
              variant="contained"
              sx={{ mb: 1 }}
              onClick={() => {
                navigate("/wb/administration/users/add");
              }}
            >
              Add
            </Button>
            <Button variant="contained" sx={{ mb: 1, ml: 0.5 }} onClick={() => refetch()}>
              Reload
            </Button>
          </Box>
        </Box> */}

        <div style={{ marginBottom: "5px" }}>
          <Box display="flex">
            <Typography variant="h3">Daftar User</Typography>
            <Box display="flex" ml="auto">
              <Button
                variant="contained"
                sx={{
                  fontSize: "11px",
                  padding: "8px 8px",
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: "8px",
                }}
                onClick={() => {
                  navigate("/wb/administration/users/add");
                }}
              >
                <AddIcon sx={{ mr: "5px", fontSize: "16px" }} />
                Tambah Data
              </Button>
            </Box>
          </Box>
          <hr sx={{ width: "100%" }} />
          <Box display="flex" pb={1}>
            <Box display="flex" borderRadius="5px" ml="auto" border="solid grey 1px">
              <InputBase
                sx={{ ml: 2, flex: 2, fontSize: "13px" }}
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon sx={{ mr: "3px", fontSize: "19px" }} />
              </IconButton>
            </Box>
          </Box>
        </div>

        <Box
          className="ag-theme-alpine"
          sx={{ "& .ag-header-cell-label": { justifyContent: "center" }, width: "auto", height: "75vh" }}
        >
          <AgGridReact
            rowData={filteredData} // Row Data for Rows
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
      </Paper>
    </Box>
  );
};

export default UMUser;
