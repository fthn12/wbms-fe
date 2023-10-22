import { React } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import { grey } from "@mui/material/colors";
import * as CityAPI from "../../../apis/citiesApi";

const CreateCity = ({ isOpen, onClose, dtProvinces }) => {
  // Create
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    CityAPI.create(values)
      .then((res) => {
        console.log("Data Berhasil Disimpan:", res.data);
        toast.success("Data Berhasil Disimpan"); // Tampilkan toast sukses
        // Lakukan tindakan tambahan atau perbarui state sesuai kebutuhan
      })
      .catch((error) => {
        console.error("Data Gagal Disimpan:", error);
        toast.error("Data Gagal Disimpan: " + error.message); // Tampilkan pesan error spesifik
        // Tangani error atau tampilkan pesan error
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
        onClose("", false);
      });
  };

  const initialValues = {
    name: "",
    provinceId: "",
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    provinceId: yup.string().required("required"),
  });

  return (
    <Dialog open={isOpen} fullWidth maxWidth={"sm"}>
      <DialogTitle sx={{ color: "white", backgroundColor: "black", fontSize: "27px" }}>
        Tambah Data City
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
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                padding={2}
                paddingBottom={2}
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
                    Name
                  </FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Masukkan Name...."
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
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
                    Province
                  </FormLabel>
                  <Select
                    fullWidth
                    name="provinceId"
                    value={values?.provinceId}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      color: MenuItem ? "gray" : "black",
                    }}
                  >
                    <MenuItem value="" disabled>
                      -- Pilih Province --
                    </MenuItem>
                    {dtProvinces.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
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

export default CreateCity;
