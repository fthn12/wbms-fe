import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Sidebar as SidebarPS, Menu, SubMenu, MenuItem, menuClasses } from "react-pro-sidebar";

import { tokens, useAuth, useApp, useConfig } from "../../../hooks";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import DragHandleOutlinedIcon from "@mui/icons-material/DragHandleOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";

// hex to rgba converter
// pakai rgba agar bisa set transparansi
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} replace />}
    >
      {title}
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const colors = tokens(theme.palette.mode);

  const { sidebar, setSidebar } = useApp();
  const { WBMS } = useConfig();

  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const themes = {
    light: {
      sidebar: {
        backgroundColor: "#ffffff",
        color: "#607489",
      },
      menu: {
        menuContent: "#fbfcfd",
        icon: "#0098e5",
        hover: {
          backgroundColor: "#c5e4ff",
          color: "#44596e",
        },
        disabled: {
          color: "#9fb6cf",
        },
      },
    },
    dark: {
      sidebar: {
        backgroundColor: theme.palette.neutral.dark,
        color: "#8ba1b7",
      },
      menu: {
        menuContent: colors.grey[600],
        icon: "#59d0ff",
        hover: {
          backgroundColor: "#00458b",
          color: "#b6c8d9",
        },
        disabled: {
          color: "#3e5e7e",
        },
      },
    },
  };

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
      // color: colors.grey[100],
      // padding: "5px 35px 5px 20px",
    },
    icon: {
      color: themes[theme.palette.mode].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme.palette.mode].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? hexToRgba(themes[theme.palette.mode].menu.menuContent, 1) : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme.palette.mode].menu.disabled.color,
      },
      [`&.${menuClasses.active}`]: {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.neutral.main : theme.palette.neutral.medium,
        color: colors.grey[200],
        fontWeight: 600,
      },
      "&:hover": {
        backgroundColor: hexToRgba(themes[theme.palette.mode].menu.hover.backgroundColor, 1),
        color: themes[theme.palette.mode].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const setSelected = (title) => {
    setSidebar({ selected: title });
  };

  return (
    <Box display="flex" height="calc(100vh - 64px)">
      <SidebarPS
        collapsed={sidebar.isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor={hexToRgba(themes[theme.palette.mode].sidebar.backgroundColor, 1)}
        // backgroundColor={theme.palette.neutral.light}
        rootStyles={{
          color: themes[theme.palette.mode].sidebar.color,
        }}
        style={{
          height: "100%",
          top: "auto",
        }}
      >
        {/* <div style={{ display: "flex", flexDirection: "column", height: "100%" }}> */}
        <Menu iconShape="square" menuItemStyles={menuItemStyles}>
          {/* LOGO AND MENU ICON */}
          {/* <MenuItem icon={sidebar.isCollapsed ? <MenuOutlinedIcon /> : undefined} onClick={setIsCollapsed}>
            {!sidebar.isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" fontWeight={700} color={colors.grey[100]}>
                  WBMS
                </Typography>
                <IconButton sx={{ color: colors.grey[100] }} onClick={setIsCollapsed}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem> */}

          <Box sx={styles.avatarContainer}>
            {/* <Box display="flex" justifyContent="center" alignItems="center"> */}
            <Avatar src={require("../../../assets/images/photo/profile.png")} sx={styles.avatar}>
              SN
            </Avatar>
            {/* </Box> */}
            {!sidebar.isCollapsed && (
              <Box textAlign="center">
                <Typography variant="h3" color={colors.grey[400]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color={colors.greenAccent[500]} fontWeight={600} letterSpacing="0.5px">
                  {`${user.position} - ${user.division}`}
                </Typography>
              </Box>
            )}
          </Box>

          {/* MENU ITEMS */}
          <Box paddingLeft={sidebar.isCollapsed ? undefined : "0%"}>
            <Item
              title="Dashboard"
              to="/wb"
              icon={<HomeOutlinedIcon />}
              selected={sidebar.selected}
              setSelected={setSelected}
            />

            {WBMS.SITE_TYPE === "1" && (
              <Item
                title="Transaksi WB PKS"
                to="/wb/transactions/1"
                icon={<LocalShippingOutlinedIcon />}
                selected={sidebar.selected}
                setSelected={setSelected}
              />
            )}
            {WBMS.SITE_TYPE === "2" && (
              <Item
                title="Transaksi WB T30"
                to="/wb/transactions/2"
                icon={<LocalShippingOutlinedIcon />}
                selected={sidebar.selected}
                setSelected={setSelected}
              />
            )}
            {WBMS.SITE_TYPE === "3" && (
              <Item
                title="Transaksi WB Bulking"
                to="/wb/transactions/3"
                icon={<LocalShippingOutlinedIcon />}
                selected={sidebar.selected}
                setSelected={setSelected}
              />
            )}
            {/* <Item
              title="Approval Request"
              to="#"
              icon={<ContactsOutlinedIcon />}
              selected={sidebar.selected}
              setSelected={setSelected}
            /> */}
            <SubMenu label="Laporan" icon={<BarChartOutlinedIcon />}>
              <Item
                title="Transaksi Harian"
                to="reports/transactions-daily"
                icon={<ArrowRightOutlinedIcon />}
                selected={sidebar.selected}
                setSelected={setSelected}
              />
              <Item
                title="Transaksi Dihapus"
                to="reports/transactions-delete"
                icon={<ArrowRightOutlinedIcon />}
                selected={sidebar.selected}
                setSelected={setSelected}
              />
            </SubMenu>

            {(user.role === 4 || user.role === 5) && (
              <SubMenu label="Master Data" icon={<TopicOutlinedIcon />}>
                {/* <Item
                  title="Countries"
                  to="md/countries"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                /> */}
                <Item
                  title="Provices"
                  to="md/provinces"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
                <Item
                  title="City"
                  to="md/cities"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Products"
                  to="md/products"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Sites"
                  to="md/sites"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Storage Tanks"
                  to="md/storage-tanks"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Transport Vehicles"
                  to="md/transport-vehicles"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Companies"
                  to="md/companies"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Drivers"
                  to="md/driver"
                  icon={<ArrowRightOutlinedIcon />}
                  selected={sidebar.selected}
                  setSelected={setSelected}
                />
              </SubMenu>
            )}

            {(user.role === 4 || user.role === 5) && (
              <SubMenu label="Administrasi" icon={<DisplaySettingsOutlinedIcon />}>
                <SubMenu label="User Management" icon={<PeopleOutlinedIcon />}>
                  <Item
                    title="User List"
                    to="administration/users"
                    icon={<ArrowRightOutlinedIcon />}
                    selected={sidebar.selected}
                    setSelected={setSelected}
                  />
                </SubMenu>
              </SubMenu>
            )}
          </Box>
        </Menu>
        {/* </div> */}
      </SidebarPS>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    mt: 2,
    mb: 2,
  },
  avatar: {
    width: "50%",
    height: "auto",
  },
};

export default Sidebar;
