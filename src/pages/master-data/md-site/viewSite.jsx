import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";

const ViewSites = ({ isViewOpen, onClose, dtCompanies, dtSites, dtSite, dtCity }) => {
  return (
    <Dialog
      open={isViewOpen}
      fullWidth
      inputProps={{ readOnly: true }}
      maxWidth="md"
      onClose={() => onClose("", false)}
    >
      <DialogTitle sx={{ color: "white", backgroundColor: "black", fontSize: "27px" }}>
        Detail Data Site
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
        <Formik initialValues={dtSites}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                padding={2}
                paddingBottom={1}
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
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Masukkan Code...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code}
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
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Masukkan Full Name...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
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
                    inputProps={{ readOnly: true }}
                    placeholder="Masukkan Short Name...."
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shortName}
                    name="shortName"
                    error={!!touched.shortName && !!errors.shortName}
                    helperText={touched.shortName && errors.shortName}
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
                    Company Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Company Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.companyName}
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
                    Source Site Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Masukkan Source Site Name...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.sourceSiteName}
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
                    value={values.cityId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ readOnly: true }}
                    IconComponent={() => null}
                  >
                    <MenuItem value="" disabled>
                      -- Pilih City --
                    </MenuItem>
                    {dtCity.map((item) => {
                      return <MenuItem value={item.id}>{item.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>

                <br />

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
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Masukkan Latitude...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.latitude}
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
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Masukkan Longitude...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.longitude}
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
                    inputProps={{ readOnly: true }}
                    type="number"
                    placeholder="Masukkan Solar Calibration...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.solarCalibration}
                    name="solarCalibration"
                    error={!!touched.solarCalibration && !!errors.solarCalibration}
                    helperText={touched.solarCalibration && errors.solarCalibration}
                  />
                  <FormLabel
                    sx={{
                      color: "black",
                      marginBottom: "8px",
                      marginTop: "20px",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Mill
                  </FormLabel>
                  <Select
                    labelId="label-module"
                    fullWidth
                    value={values.isMill}
                    name="isMill"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ readOnly: true }}
                    IconComponent={() => null}
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
                    rows={6}
                    variant="outlined"
                    inputProps={{ readOnly: true }}
                    type="text"
                    placeholder="Masukkan Description...."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
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

export default ViewSites;
