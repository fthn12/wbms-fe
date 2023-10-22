import { useState } from "react";
import QRCode from "react-qr-code";
import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";
import QrCode2OutlinedIcon from "@mui/icons-material/QrCode2Outlined";

import { useConfig, useEDispatch } from "../hooks";

const QRCodeViewer = (props) => {
  const { wbTransaction, type } = props;

  const { WBMS } = useConfig();
  const { useEncodeQrcodeMutation } = useEDispatch();

  const [encodeQrcode, { isLoading }] = useEncodeQrcodeMutation();

  const [qrContent, setQrContent] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleShowQrcode = () => {
    try {
      setIsVisible(true);

      const data = {
        orderId: wbTransaction?.jsonData?.deliveryOrderId,
        functionCode: 0,
      };

      if (WBMS.SITE_TYPE === "1") {
        if (wbTransaction?.progressStatus === 1) {
          // Function Code 2 = Initiate Delivery
          data.functionCode = 2;
        } else if (wbTransaction?.progressStatus === 4) {
          // Function Code 6 = Dispatch Delivery
          data.functionCode = 6;
        } else if (wbTransaction?.progressStatus === 9) {
          // Function Code 15 = Closed Delivery as Canceled
          data.functionCode = 15;
        } else if (wbTransaction?.progressStatus === 14) {
          // Function Code 17 = Closed Delivery as Rejected
          data.functionCode = 17;
        }
      } else if (WBMS.SITE_TYPE === "2") {
        if (wbTransaction?.progressStatus === 1) {
          // Function Code 2 = Initiate Delivery
          data.functionCode = 2;
        } else if (wbTransaction?.progressStatus === 4) {
          // Function Code 6 = Dispatch Delivery
          data.functionCode = 6;
        } else if (wbTransaction?.progressStatus === 9) {
          // Function Code 15 = Closed Delivery as Canceled
          data.functionCode = 15;
        } else if (wbTransaction?.progressStatus === 14) {
          // Function Code 17 = Closed Delivery as Rejected
          data.functionCode = 17;
        }
      } else if (WBMS.SITE_TYPE === "3") {
        if (wbTransaction?.progressStatus === 1) {
          // Function Code 10 = Initiate Unloading
          data.functionCode = 10;
        } else if (wbTransaction?.progressStatus === 4) {
          // Function Code 18 = Close Delivery As Accepted
          data.functionCode = 18;
        } else if (wbTransaction?.progressStatus === 14) {
          // Function Code 11 = Reject Delivery
          data.functionCode = 11;
        }
      }

      encodeQrcode(data).then((results) => {
        setQrContent(results?.data?.data?.qrcode);
      });
    } catch (error) {
      toast.error(`${error.message}.`);
      setIsVisible(false);
      return;
    }
  };

  return (
    <>
      {type === "form" && (
        <Button
          variant="contained"
          fullWidth
          size="small"
          onClick={() => handleShowQrcode()}
          disabled={
            !(
              wbTransaction?.progressStatus === 1 ||
              wbTransaction?.progressStatus === 4 ||
              wbTransaction?.progressStatus === 9 ||
              wbTransaction?.progressStatus === 14
            )
          }
        >
          Tampilkan QR
        </Button>
      )}

      {type === "grid" && (
        <IconButton
          size="small"
          onClick={() => handleShowQrcode()}
          disabled={
            !(
              wbTransaction?.progressStatus === 1 ||
              wbTransaction?.progressStatus === 4 ||
              wbTransaction?.progressStatus === 9 ||
              wbTransaction?.progressStatus === 14
            )
          }
        >
          <QrCode2OutlinedIcon />
        </IconButton>
      )}

      <Dialog open={isVisible} fullWidth onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3" fontWeight="bold">
            QR Code
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 381,
              maxHeight: 381,
              width: "100%",
            }}
          >
            {!isLoading && (
              <QRCode
                size={512}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrContent}
                viewBox={`0 0 256 256`}
              />
            )}
            {isLoading && (
              <Box sx={{ minHeight: 385, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Typography variant="h5" color={"goldenrod"} fontWeight="bold" sx={{ ml: 2 }}>
            Rekam Kode ini dari HP
          </Typography>
          <Box flex={1} />
          <Button variant="contained" onClick={() => handleShowQrcode()} sx={{ mr: 1 }}>
            Refresh
          </Button>
          <Button variant="contained" onClick={() => handleClose()}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QRCodeViewer;
