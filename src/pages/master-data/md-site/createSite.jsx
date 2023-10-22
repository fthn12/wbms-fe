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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { grey } from "@mui/material/colors";
import * as SitesAPI from "../../../apis/sitesApi";

const CreateSites = ({ isOpen, onClose, dtCity, dtCompanies, dtSites }) => {
  const handleSubmit = (values, { setSubmitting }) => {
    values.latitude = parseFloat(values.latitude);
    values.longitude = parseFloat(values.longitude);
    values.solarCalibration = parseInt(values.solarCalibration);

    SitesAPI.create(values)
      .then((res) => {
        toast.success("Data Berhasil Disimpan");
        onClose();
      })
      .catch((error) => {
        console.error("Error creating item:", error);
        toast.error("Error creating item");
      });
    onClose("", false);
  };

  const checkoutSchema = yup.object().shape({
    // sourceSiteName: yup.string().required("required"),
    companyName: yup.string().required("required"),
    code: yup.string().required("required"),
    shortName: yup.string().required("required"),
    description: yup.string().required("required"),
    name: yup.string().required("required"),
    companyId: yup.string().required("required"),
    cityId: yup.string().required("required"),
    solarCalibration: yup.number().required("required"),
    latitude: yup.number().required("required"),
    longitude: yup.number().required("required"),
    isMill: yup.boolean().required(""),
  });
  const initialValues = {
    // sourceSiteName: "",
    companyName: "",
    code: "",
    name: "",
    shortName: "",
    description: "",
    latitude: "",
    longitude: "",
    isMill: "",
    companyId: "",
    cityId: "",
    solarCalibration: "",
  };

  return (
    <Dialog open={isOpen} fullWidth maxWidth="md">
      <DialogTitle sx={{ color: "white", backgroundColor: "black", fontSize: "27px" }}>
        Tambah Data Site
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

      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
                    placeholder="Masukkan Code...."
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
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Full Name
                  </FormLabel>

                  <TextField
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Full Name...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    id="name-input"
                  />
                </FormControl>
                <FormControl sx={{ gridColumn: "span 3" }}>
                  <FormLabel
                    sx={{
                      marginBottom: "8px",
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Short Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Masukkan Short Name...."
                    type="text"
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
                    Company
                  </FormLabel>
                  <Select
                    fullWidth
                    name="companyId"
                    value={values?.companyId}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      const selectedCompany = dtCompanies.find((item) => item.id === event.target.value);
                      setFieldValue("companyName", selectedCompany ? selectedCompany.name : "");
                    }}
                    displayEmpty
                    sx={{
                      color: MenuItem ? "gray" : "black",
                    }}
                  >
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
                    }}
                  >
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
                      color: "black",
                      marginBottom: "8px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Source Site
                  </FormLabel>
                  <Select
                    fullWidth
                    name="sourceSiteId"
                    value={values?.sourceSiteId || ""}
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      const selectedSite = dtSites.find((item) => item.id === event.target.value);
                      setFieldValue("sourceSiteName", selectedSite ? selectedSite.name : "");
                    }}
                    displayEmpty
                    sx={{
                      color: MenuItem ? "gray" : "black",
                    }}
                  >
                    <MenuItem value="" disabled>
                      -- Pilih Source Site --
                    </MenuItem>
                    {dtSites.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
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
                    Source Site Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Source Site Name...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.sourceSiteName}
                    name="sourceSiteName"
                    error={!!touched.sourceSiteName && !!errors.sourceSiteName}
                    helperText={touched.sourceSiteName && errors.sourceSiteName}
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
                    City
                  </FormLabel>
                  <Select
                    fullWidth
                    name="cityId"
                    value={values?.cityId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      color: MenuItem ? "gray" : "black",
                    }}
                  >
                    <MenuItem value="" disabled>
                      -- Pilih City --
                    </MenuItem>
                    {dtCity.map((item) => {
                      return <MenuItem value={item.id}>{item.name}</MenuItem>;
                    })}
                  </Select>
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
                    Latitude
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Latitude...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.latitude}
                    name="latitude"
                    error={!!touched.latitude && !!errors.latitude}
                    helperText={touched.latitude && errors.latitude}
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
                    Longitude
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder="Masukkan Longitude...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.longitude}
                    name="longitude"
                    error={!!touched.longitude && !!errors.longitude}
                    helperText={touched.longitude && errors.longitude}
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
                    Solar Calibration
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    placeholder="Masukkan Solar Calibration...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.solarCalibration}
                    name="solarCalibration"
                    error={!!touched.solarCalibration && !!errors.solarCalibration}
                    helperText={touched.solarCalibration && errors.solarCalibration}
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
                    Mill
                  </FormLabel>
                  <Select
                    labelId="label-module"
                    fullWidth
                    value={values?.isMill}
                    name="isMill"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      color: MenuItem ? "gray" : "black",
                    }}
                  >
                    <MenuItem value="" disabled>
                      Pilih Mill
                    </MenuItem>
                    <MenuItem value={true}>YES</MenuItem>
                    <MenuItem value={false}>NO</MenuItem>
                  </Select>
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
                    rows={4}
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

export default CreateSites;
