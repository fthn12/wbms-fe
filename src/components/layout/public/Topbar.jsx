import { useNavigate } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography, useTheme as useThemeMUI } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { tokens, useTheme } from "../../../hooks";

const Topbar = () => {
  const navigate = useNavigate();

  const theme = useThemeMUI();
  const { colorMode } = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={styles.appBar}>
        <Toolbar>
          <Box
            display="flex"
            component="img"
            sx={styles.appLogo}
            src={require("../../../assets/images/logo_small_white.png")}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h3"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WBMS
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton size="small" onClick={colorMode.toggleColorMode} color="secondary">
            {theme.palette.mode === "light" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>

          <Tooltip title="Sign in to DSN WBMS">
            <IconButton size="small" color="secondary" onClick={() => navigate("/signin")}>
              <LoginOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: "neutral.main",
  },
  appLogo: {
    display: "flex",
    mr: 1,
    borderRadius: 1,
    width: 36,
    height: 36,
    cursor: "pointer",
  },
};

export default Topbar;
