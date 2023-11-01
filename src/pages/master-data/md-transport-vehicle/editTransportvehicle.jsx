import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  FormLabel,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { grey } from "@mui/material/colors";
import moment from "moment";
import { useTransportVehicle } from "../../../hooks";


const EditTransportvehicle = ({
  isEditOpen,
  onClose,
  dtCompanies,
  dtProduct,
  dtTransportVehicle,
}) => {

  const { useUpdateTransportVehicleMutation } = useTransportVehicle();
  const [updateTransportVehicle] = useUpdateTransportVehicleMutation();
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    values.licenseED = moment(values.licenseED).toDate();
    values.keurED = moment(values.keurED).toDate();
    values.capacity = parseFloat(values.capacity);
    values.sccModel = parseInt(values.sccModel);

    try {
      updateTransportVehicle(values).then((results) => {
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

  const UserSchema = yup.object().shape({
    companyId: yup.string().required("required"),
    companyName: yup.string().required("required"),
    code: yup.string().required("required"),
    productId: yup.string().required("required"),
    productName: yup.string().required("required"),
    productCode: yup.string().required("required"),
    plateNo: yup.string().required("required"),
    capacity: yup.number().required("required"),
    brand: yup.string().required("required"),
    model: yup.string().required("required"),
    sccModel: yup.number().required("required"),
    notes: yup.string().required("required"),
    licenseED: yup.date().required("required"),
    keurED: yup.date().required("required"),
  });


  return (
    <Dialog open={isEditOpen} fullWidth maxWidth="md">
      <DialogTitle
        sx={{ color: "white", backgroundColor: "black", fontSize: "27px" }}>
        Edit Data Transport Vehicle
        <IconButton
          sx={{
            color: "white",
            position: "absolute",
            right: "10px",
            top: "15px",
          }}
          onClick={() => {
            onClose("", false);
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={dtTransportVehicle}
        validationSchema={UserSchema}
        >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Box
                display="grid"
                padding={2}
                paddingBottom={2}
                paddingLeft={3}
                paddingRight={3}
                gap="20px"
                gridTemplateColumns="repeat(8, minmax(0, 1fr))">
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Plat No
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Plat No...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.plateNo}
                    name="plateNo"
                    error={!!touched.plateNo && !!errors.plateNo}
                    helperText={touched.plateNo && errors.plateNo}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Code
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Code...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.code}
                    name="code"
                    error={!!touched.code && !!errors.code}
                    helperText={touched.code && errors.code}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Company
                  </FormLabel>
                  <Select
                    fullWidth
                    name="companyId"
                    value={values?.companyId}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      const selectedCompany = dtCompanies.find(
                        (item) => item.id === event.target.value
                      );
                      setFieldValue(
                        "companyName",
                        selectedCompany ? selectedCompany.name : ""
                      );
                    }}
                    displayEmpty>
                    <MenuItem value="" disabled>
                      -- Pilih Company --
                    </MenuItem>
                    {dtCompanies.map((item) => {
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
                    }}>
                    Company Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukan Company Name....."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.companyName}
                    name="companyName"
                    error={!!touched.companyName && !!errors.companyName}
                    helperText={touched.companyName && errors.companyName}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Capacity
                  </FormLabel>

                  <TextField
                    variant="outlined"
                    type="number"
                    placeholder="Masukkan Capacity...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.capacity}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                    name="capacity"
                    error={!!touched.capacity && !!errors.capacity}
                    helperText={touched.capacity && errors.capacity}
                    id="capacity-input"
                  />
                </FormControl>

                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    License ED
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="date"
                    placeholder="Masukkan Keur ED...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.licenseED
                        ? format(new Date(values.licenseED), "yyyy-MM-dd")
                        : ""
                    }
                    name="licenseED"
                    error={!!touched.licenseED && !!errors.licenseED}
                    helperText={touched.licenseED && errors.licenseED}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Product
                  </FormLabel>
                  <Select
                    fullWidth
                    name="productId"
                    value={values?.productId}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      const selectedproduct = dtProduct.find(
                        (item) => item.id === event.target.value
                      );
                      setFieldValue(
                        "productName",
                        selectedproduct ? selectedproduct.name : ""
                      );
                    }}
                    displayEmpty>
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
                    }}>
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
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Product Code
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Product Code..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.productCode}
                    name="productCode"
                    error={!!touched.productCode && !!errors.productCode}
                    helperText={touched.productCode && errors.productCode}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Scc Model
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    placeholder="Masukkan Scc Model...."
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
                    }}>
                    Brand
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Brand....."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.brand}
                    name="brand"
                    error={!!touched.brand && !!errors.brand}
                    helperText={touched.brand && errors.brand}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Model
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Model..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.model}
                    name="model"
                    error={!!touched.model && !!errors.model}
                    helperText={touched.model && errors.model}
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Notes
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Notes...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.notes}
                    name="notes"
                    error={!!touched.notes && !!errors.notes}
                    helperText={touched.notes && errors.notes}
                  />
                </FormControl>

                <FormControl sx={{ gridColumn: "span 4" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}>
                    Keur ED
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="date"
                    placeholder="Masukkan Keur ED...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={
                      values.keurED
                        ? format(new Date(values.keurED), "yyyy-MM-dd")
                        : ""
                    }
                    name="keurED"
                    error={!!touched.keurED && !!errors.keurED}
                    helperText={touched.keurED && errors.keurED}
                  />
                </FormControl>
              </Box>
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
                    }}>
                    Cancel
                  </Button>
                </Box>
                <Box mr={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      color: "white",
                    }}>
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

export default EditTransportvehicle;
