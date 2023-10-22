import { Typography, Box, useTheme, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProgressStatus from "../../ProgressStatus";
import GetWeightWB from "../../GetWeightWB";
import QRCodeScanner from "../../QRCodeScanner";

import * as TransactionAPI from "../../../apis/transactionApi";

import { tokens, useConfig, useTransaction } from "../../../hooks";

const Header = ({ title, subtitle }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { WBMS } = useConfig();
  const { wbTransaction, setWbTransaction, clearWbTransaction } = useTransaction();

  const handleCloseQRCodeScanner = async (codeContent, readEnter) => {
    if (codeContent?.trim().length > 10) {
      try {
        const data = { content: codeContent.trim(), typeSite: WBMS.SITE_TYPE };

        console.log("data:", data);

        const response = await TransactionAPI.eDispatchFindOrCreateByQrcode(data);

        console.log("response:", response);

        if (!response?.status) {
          throw new Error(response?.message);
        }

        console.log("vStatus:", response.data.draftTransaction.vehicleStatus);
        console.log("dStatus:", response.data.draftTransaction.deliveryStatus);

        setWbTransaction(response.data.draftTransaction);

        navigate(response.data.urlPath);
      } catch (error) {
        toast.error(`${error.message}.`);
        return;
      }
    } else if (readEnter) {
      return toast.error("Tidak dapat membaca QR Code atau QR Code tidak valid...");
    }
  };

  return (
    <Paper sx={{ display: "flex", p: 2, width: "100%" }}>
      <Box>
        <Typography variant="h2" color={theme.palette.neutral.dark} fontWeight="bold" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h5" color={theme.palette.neutral.dark}>
          {subtitle}
        </Typography>
      </Box>
      <Box flex={1} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <ProgressStatus />
        </Box>
        <Box sx={{ ml: 1 }}>
          <GetWeightWB />
        </Box>
        <Box sx={{ ml: 1 }}>
          <QRCodeScanner onCloseHandler={handleCloseQRCodeScanner} />
        </Box>
      </Box>
    </Paper>
  );
};

export default Header;
