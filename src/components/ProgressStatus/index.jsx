import { useState } from "react";
import { TextField } from "@mui/material";

import { useTransaction, useConfig } from "../../hooks";
import { useEffect } from "react";

const ProgressStatus = () => {
  const { wbTransaction } = useTransaction();
  const { WBMS, PKS_PROGRESS_STATUS, T30_PROGRESS_STATUS, BULKING_PROGRESS_STATUS } = useConfig();

  const [progressStatusLabel, setProgressStatusLabel] = useState("-");

  // try {
  //   if (WBMS.SITE_TYPE === "1") {
  //     setProgressStatusLabel(PKS_PROGRESS_STATUS[wbTransaction?.progressStatus]);
  //   }
  // } catch (error) {
  //   console.log("error in progress status label:", error);
  // }
  useEffect(() => {
    if (!wbTransaction) {
      setProgressStatusLabel("-");
    } else {
      if (WBMS.SITE_TYPE === "1") {
        setProgressStatusLabel(PKS_PROGRESS_STATUS[wbTransaction?.progressStatus]);
      } else if (WBMS.SITE_TYPE === "2") {
        setProgressStatusLabel(T30_PROGRESS_STATUS[wbTransaction?.progressStatus]);
      } else if (WBMS.SITE_TYPE === "3") {
        setProgressStatusLabel(BULKING_PROGRESS_STATUS[wbTransaction?.progressStatus]);
      }
    }
  }, [wbTransaction]);

  return (
    <TextField
      label="STATUS PROSES"
      type="text"
      variant="outlined"
      size="medium"
      fullWidth
      // disabled
      // multiline
      value={progressStatusLabel}
      sx={{
        backgroundColor: "whitesmoke",
        minWidth: 500,
      }}
      inputProps={{
        readOnly: true,
        style: {
          textAlign: "center",
          fontWeight: "900",
          fontSize: "x-large",
        },
      }}
    />
  );
};

export default ProgressStatus;
