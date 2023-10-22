import { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

import { useWeighbridge, useTransaction } from "../hooks";

const QRCodeScanner = (props) => {
  const { onCloseHandler } = props;

  const { wb } = useWeighbridge();
  const { wbTransaction } = useTransaction();

  const [isOpen, setIsOpen] = useState(false);
  const [codeContent, setCodeContent] = useState("");

  useEffect(() => {
    setCodeContent("");
  }, [isOpen]);

  const qrcodeAutoFocus = () => {
    document.getElementById("qrcode")?.focus();
  };

  const onChangeQrcode = (event) => {
    setCodeContent(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onCloseHandler(codeContent, true);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.getElementById("qrcode")?.focus();
  }, []);

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ height: "67.5px", width: "100px" }}
        fullWidth
        disabled={!wb?.canStartScalling || !!wbTransaction}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Scan QR
      </Button>
      <Dialog
        open={isOpen}
        fullWidth
        // fullScreen
        // keepMounted
        onClose={() => {
          setIsOpen(false);
          onCloseHandler("", false);
        }}
      >
        <DialogTitle>
          <Typography variant="h3" fontWeight="bold">
            Scan QR Code
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            id="qrcode"
            name="qrcode"
            label="Arahkan Kode Identitas ke Scanner"
            value={codeContent}
            onChange={onChangeQrcode}
            onKeyDown={onKeyDown}
            onBlur={qrcodeAutoFocus}
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "large",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Typography variant="h5" color={"goldenrod"} fontWeight="bold" sx={{ ml: 2 }}>
            Arahkan Kode Identitas ke Scanner
          </Typography>
          <Box flex={1} />
          <Button
            variant="contained"
            onClick={() => {
              setIsOpen(false);
              onCloseHandler("", false);
            }}
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QRCodeScanner;
