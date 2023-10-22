import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";

const ViewProvinces = ({
  isViewOpen,
  onClose,
  dtProvince,
}) => {
  return (
    <Dialog
      open={isViewOpen}
      fullWidth
      maxWidth="sm"
      onClose={() => onClose("", false)}
    >
      <DialogTitle
        sx={{ color: "white", backgroundColor: "black", fontSize: "27px" }}
      >
        Detail Data Provinces
        <IconButton
          sx={{
            color: "white",
            position: "absolute",
            right: "10px",
            top: "15px",
          }}
          onClick={() => {
            onClose("", false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Formik initialValues={dtProvince}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                padding={2}
                paddingBottom={3}
                paddingLeft={3}
                paddingRight={3}
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Nama
                  </FormLabel>

                  <TextField
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Masukkan Nama...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    id="name-input"
                  />
                </FormControl>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProvinces;
