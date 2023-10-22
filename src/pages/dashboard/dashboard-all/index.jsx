import { useEffect } from "react";
import { Box } from "@mui/material";

import Header from "../../../components/layout/signed/Header";

import { useApp } from "../../../hooks";

const DashboardAll = () => {
  const { setSidebar } = useApp();

  useEffect(() => {
    setSidebar({ selected: "Dashboard" });
  }, []);

  return (
    <Box>
      <Header title="DASHBOARD" subtitle="WBMS Dashboard" />
    </Box>
  );
};

export default DashboardAll;
