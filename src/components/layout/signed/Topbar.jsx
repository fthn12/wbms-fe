import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { alpha } from "@mui/material/styles";
import { AppBar, Avatar, Box, Divider, IconButton } from "@mui/material";
import { InputBase, Toolbar, Tooltip, Typography, useTheme as useThemeMUI } from "@mui/material";
import { Menu, MenuItem, Badge } from "@mui/material";

import { tokens, useTheme, useApp, useAuth } from "../../../hooks";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";

const Topbar = () => {
  const navigate = useNavigate();

  const theme = useThemeMUI();
  const { colorMode } = useTheme();
  const colors = tokens(theme.palette.mode);

  const { sidebar, setSidebar } = useApp();
  const { clearCredentials, useSignoutMutation } = useAuth();

  const [signout] = useSignoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isAccountMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const setIsCollapsed = () => {
    setSidebar({ isCollapsed: !sidebar.isCollapsed });
  };

  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSignOut = async (e) => {
    try {
      const res = await signout().unwrap();

      // console.log("response:", res);

      if (!!!res?.status) {
        toast.error(res.message);

        return;
      }

      clearCredentials();

      navigate("/", { replace: true });
    } catch (err) {
      // toast.error(err?.data?.message || err.error);

      if (!!!err?.status) {
        toast.error("No server response.");
      } else if (err.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Already Signout.");
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.appBar}>
        <Toolbar>
          <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }} onClick={setIsCollapsed}>
            <MenuOutlinedIcon />
          </IconButton>
          <Box
            display="flex"
            component="img"
            sx={styles.appLogo}
            src={require("../../../assets/images/logo_small_white.png")}
          />
          <Typography
            variant="h3"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "block" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WBMS
          </Typography>

          {/* <Box sx={styles.searchWrapper}>
            <Box sx={styles.searchIcon}>
              <SearchOutlinedIcon />
            </Box>
            <InputBase placeholder="Search…" fullWidth sx={styles.searchInput} />
          </Box> */}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="small" onClick={colorMode.toggleColorMode} color="secondary">
              {theme.palette.mode === "light" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
            {/* <IconButton size="small" color="secondary">
              <Badge badgeContent={4} color="error">
                <MailOutlineOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="secondary">
              <Badge badgeContent={17} color="error">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton size="small" color="secondary">
              <SettingsOutlinedIcon />
            </IconButton> */}
            <Tooltip title="Account Settings">
              <IconButton
                size="small"
                color="secondary"
                onClick={handleAccountMenuOpen}
                aria-controls={isAccountMenuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isAccountMenuOpen ? "true" : undefined}
              >
                <Avatar sx={{ width: 36, height: 36 }} src={require("../../../assets/images/photo/profile.png")}>
                  SN
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              color="secondary"
              onClick={handleMobileMenuOpen}
              aria-label="show more"
              aria-controls={isMobileMenuOpen ? "mobile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isMobileMenuOpen ? "true" : undefined}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isAccountMenuOpen}
        onClose={handleAccountMenuClose}
        onClick={handleAccountMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleAccountMenuClose}>
          <Avatar /> My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAccountMenuClose}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSignOut();
            handleAccountMenuClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        id="mobile-menu"
        open={isMobileMenuOpen}
        onClick={handleMobileMenuClose}
        onClose={handleMobileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMobileMenuClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleMobileMenuClose}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMobileMenuClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
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
  searchWrapper: {
    position: "relative",
    mr: 2,
    borderRadius: 1,
    backgroundColor: alpha("#ffffff", 0.15),
    "&:hover": {
      backgroundColor: alpha("#ffffff", 0.25),
    },

    width: "100%",
  },
  searchIcon: {
    pl: 2,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    color: "inherit",
    "& .MuiInputBase-input": {
      p: 1,
      pl: 6,
      width: "100%",
    },
  },
};

export default Topbar;
