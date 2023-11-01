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
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { grey } from "@mui/material/colors";
import { useStorageTank } from "../../../hooks";

const EditStorageTank = ({ isEditOpen, onClose, dtProduct, dtSite, dtCompany, dtStorageTank }) => {
  const { useUpdateStorageTankMutation } = useStorageTank();
  const [updateStorageTank] = useUpdateStorageTankMutation();

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    values.capacity = parseFloat(values.capacity);
    values.height = parseFloat(values.height);
    values.sccModel = parseInt(values.sccModel);

    try {
      updateStorageTank(values).then((results) => {
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
  
  const userSchema = yup.object().shape({
    siteId: yup.string().required("required"),
    siteName: yup.string().required("required"),
    stockOwnerId: yup.string().required("required"),
    stockOwnerName: yup.string().required("required"),
    productId: yup.string().required("required"),
    productName: yup.string().required("required"),
    code: yup.string().required("required"),
    name: yup.string().required("required"),
    shortName: yup.string().required("required"),
    description: yup.string().required("required"),
    capacity: yup.number().required("required"),
    height: yup.number().required("required"),
    sccModel: yup.number().required("required"),
  });

  return (
    <Dialog open={isEditOpen} fullWidth maxWidth="md" onClose={() => onClose("", false)}>
      <DialogTitle sx={{ color: "white", backgroundColor: "black", fontSize: "27px" }}>
        Edit Data Storage Tank
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

      <Formik onSubmit={handleFormSubmit} initialValues={dtStorageTank} validationSchema={userSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Box
                display="grid"
                padding={2}
                paddingBottom={2}
                paddingLeft={3}
                paddingRight={3}
                gap="20px"
                gridTemplateColumns="repeat(8, minmax(0, 1fr))"
              >
                <FormControl sx={{ gridColumn: "span 8" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Code
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.code}
                    name="code"
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                  />
                </FormControl>

                <FormControl sx={{ gridColumn: "span 5" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Full Nama
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Full Nama..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 3" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Short Nama
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Short Nama"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.shortName}
                    name="shortName"
                    error={!!touched.shortName && !!errors.shortName}
                    helperText={touched.shortName && errors.shortName}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Product
                  </FormLabel>
                  <Select
                    fullWidth
                    name="productId"
                    value={values?.productId}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      const selectedProduct = dtProduct.find((item) => item.id === event.target.value);
                      setFieldValue("productName", selectedProduct ? selectedProduct.name : "");
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      -- Pilih Product --
                    </MenuItem>
                    {dtProduct.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4", display: "none" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Product Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Product Name...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.productName}
                    name="productName"
                    error={!!touched.productName && !!errors.productName}
                    helperText={touched.productName && errors.productName}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Site
                  </FormLabel>
                  <Select
                    fullWidth
                    name="siteId"
                    value={values?.siteId}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      const selectedsite = dtSite.find((item) => item.id === event.target.value);
                      setFieldValue("siteName", selectedsite ? selectedsite.name : "");
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      -- Pilih Site --
                    </MenuItem>
                    {dtSite.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4", display: "none" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Nama Site
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Nama Site"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.siteName}
                    name="siteName"
                    error={!!touched.siteName && !!errors.siteName}
                    helperText={touched.siteName && errors.siteName}
                  />
                </FormControl>

                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    stockOwner
                  </FormLabel>
                  <Select
                    fullWidth
                    name="stockOwnerId"
                    value={values?.stockOwnerId}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      const selectedstockOwner = dtCompany.find((item) => item.id === event.target.value);
                      setFieldValue("stockOwnerName", selectedstockOwner ? selectedstockOwner.name : "");
                    }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      -- Pilih Stock Owner --
                    </MenuItem>
                    {dtCompany.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4", display: "none" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    StockOwner Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="stockOwner Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.stockOwnerName}
                    name="stockOwnerName"
                    error={!!touched.stockOwnerName && !!errors.stockOwnerName}
                    helperText={touched.stockOwnerName && errors.stockOwnerName}
                  />
                </FormControl>

                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Capacity
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    placeholder="Capacity"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.capacity}
                    name="capacity"
                    error={!!touched.capacity && !!errors.capacity}
                    helperText={touched.capacity && errors.capacity}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Height
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Height"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.height}
                    name="height"
                    error={!!touched.height && !!errors.height}
                    helperText={touched.height && errors.height}
                  />
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      marginTop: "23px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    SCC Model
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan SCC Mode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.sccModel}
                    name="sccModel"
                    error={!!touched.sccModel && !!errors.sccModel}
                    helperText={touched.sccModel && errors.sccModel}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Description
                  </FormLabel>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Description...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </FormControl>
              </Box>{" "}
            </DialogContent>
            <Box display flex p={1}>
              <DialogActions>
                <Box mr="auto" ml={4}>
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
                </Box>
                <Box mr={4}>
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
              </DialogActions>
            </Box>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditStorageTank;
