import { useDispatch, useSelector } from "react-redux";

import * as configRedux from "../slices/config/configSlice";
import { getConfigs } from "../slices/config/configSliceApi";

const sccModel = {
  0: "None",
  1: "Mass Balance",
  2: "Segregated",
  3: "Identity Preserved",
};

const pksProgressStatus = {
  0: "TIMBANG MASUK",
  1: "LOADING/UNLOADING",
  2: "TIMBANG KELUAR",
  3: "DATA DISPATCHED",
  4: "DATA DISPATCHED",
  5: "CANCEL\nTIMBANG MASUK",
  6: "CANCEL\nUNLOADING",
  7: "CANCEL\nTIMBANG KELUAR",
  8: "CANCEL\nSUBMITTED",
  9: "CANCEL\nSUBMITTED",
  10: "REJECT\nTIMBANG MASUK",
  11: "REJECT\nUNLOADING",
  12: "REJECT\nTIMBANG KELUAR",
  13: "REJECT\nSUBMITTED",
  14: "REJECT\nSUBMITTED",
  15: "SELESAI",
};

const t30ProgressStatus = {
  0: "TIMBANG MASUK",
  1: "LOADING/UNLOADING",
  2: "TIMBANG KELUAR",
  3: "DATA DISPATCHED",
  4: "DATA DISPATCHED",
  5: "CANCEL\nTIMBANG MASUK",
  6: "CANCEL\nUNLOADING",
  7: "CANCEL\nTIMBANG KELUAR",
  8: "CANCEL\nSUBMITTED",
  9: "CANCEL\nSUBMITTED",
  15: "SELESAI",
};

const bulkingProgressStatus = {
  0: "TIMBANG MASUK",
  1: "UNLOADING",
  2: "TIMBANG KELUAR",
  3: "DATA SUBMITED",
  4: "DATA SUBMITED",
  12: "REJECT\nTIMBANG KELUAR",
  13: "REJECT\nSUBMITTED",
  14: "REJECT\nSUBMITTED",
  15: "SELESAI",
};

const mdSource = {
  0: "WBMS",
  1: "eDispatch",
};

const roles = [
  { id: 0, value: "Not Assigned" },
  { id: 1, value: "Operator" },
  { id: 2, value: "Supervisor" },
  { id: 3, value: "Admin HC" },
  { id: 4, value: "Admin System" },
  { id: 5, value: "Admin IT" },
];

const vaSccModel = [
  { id: 0, value: "None" },
  { id: 1, value: "Mass Balance" },
  { id: 2, value: "Segregated" },
  { id: 3, value: "Identity Preserved" },
];

const rspoSccModel = [
  { id: 0, value: "None" },
  { id: 1, value: "Mass Balance" },
  { id: 2, value: "Segregated" },
  { id: 3, value: "Identity Preserved" },
];

const isccSccModel = [
  { id: 0, value: "None" },
  { id: 1, value: "Mass Balance" },
  { id: 2, value: "Segregated" },
  { id: 3, value: "Identity Preserved" },
];

export const useConfig = () => {
  const dispatch = useDispatch();

  // get value of state
  const {
    ENV,
    WBMS,
    PKS_PROGRESS_STATUS,
    T30_PROGRESS_STATUS,
    BULKING_PROGRESS_STATUS,
    MD_SOURCE,
    ROLES,
    SCC_MODEL,
    VA_SCC_MODEL,
    RSPO_SCC_MODEL,
    ISCC_SCC_MODEL,
  } = useSelector((state) => state.configs);

  const initialData = {
    ENV: process.env,

    PKS_PROGRESS_STATUS: pksProgressStatus,
    T30_PROGRESS_STATUS: t30ProgressStatus,
    BULKING_PROGRESS_STATUS: bulkingProgressStatus,
    MD_SOURCE: mdSource,
    ROLES: roles,
    SCC_MODEL: sccModel,
    VA_SCC_MODEL: vaSccModel,
    RSPO_SCC_MODEL: rspoSccModel,
    ISCC_SCC_MODEL: isccSccModel,
  };

  const syncConfig = () => {
    dispatch(getConfigs());
    dispatch(configRedux.setConfigs(initialData));
  };

  return {
    ENV,
    WBMS,
    PKS_PROGRESS_STATUS,
    T30_PROGRESS_STATUS,
    BULKING_PROGRESS_STATUS,
    MD_SOURCE,
    ROLES,
    SCC_MODEL,
    VA_SCC_MODEL,
    RSPO_SCC_MODEL,
    ISCC_SCC_MODEL,
    syncConfig,
  };
};
