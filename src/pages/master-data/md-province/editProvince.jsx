import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { grey } from "@mui/material/colors";
import { useProvince } from "../../../hooks";

const EditProvince = ({ isEditOpen, onClose, dtProvince }) => {
  const { useUpdateProvincesMutation } = useProvince();
  const [updateProvinces] = useUpdateProvincesMutation();
  const userSchema = yup.object().shape({
    name: yup.string().required("required"),
  });

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      updateProvinces(values).then((results) => {
        toast.success("Data Berhasil Disimpan");
        setSubmitting(false);
        resetForm();
        onClose("", false);
      });
    } catch (error) {
      toast.error(`${error.message}.`); 
      return;
    }
  };

  return (
    <Dialog open={isEditOpen} fullWidth maxWidth="sm" onClose={() => onClose("", false)}>
      <DialogTitle sx={{ color: "white", backgroundColor: "black", fontSize: "27px" }}>
        Edit Data Provinces
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
        <Formik onSubmit={handleFormSubmit} initialValues={dtProvince} validationSchema={userSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
              <Box display="flex" mt={2} ml={3}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: grey[700],
                    color: "white",
                  }}
                  onClick={() => {
                    onClose("", false);
                  }}
                >
                  Cancel
                </Button>
                <Box ml="auto" mr={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      color: "white",
                    }}
                  >
                    Simpan
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditProvince;
