import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../../../../components/layout/signed/Header";

import { useConfig, useUser } from "../../../../hooks";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
  email: "",
  nik: "",
  name: "",
  division: "",
  position: "",
  phone: "",
  role: 0,

  isLDAPUser: false,
};
const userSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(9, "Password minimal 8 characters"),
  passwordConfirm: yup.string().required().min(9, "Password minimal 8 characters"),
  email: yup.string().email().required(),
  nik: yup.string().required(),
  name: yup.string().required(),
  division: yup.string().required(),
  position: yup.string().required(),
  role: yup.number().required(),
});

const UserCreate = () => {
  const navigate = useNavigate();

  const { ROLES } = useConfig();
  const { useCreateUserMutation } = useUser();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [dtRoles, setDtRoles] = useState(ROLES);

  const handleFormikSubmit = (values) => {
    try {
      createUser(values).then((results) => {
        toast.success("User Berhasil Di Tambah"); // Tampilkan notifikasi sukses
        navigate("/wb/administration/users");
      });
    } catch (error) {
      toast.error(`${error.message}.`); // Tampilkan notifikasi error
      return;
    }
  };

  const handleClose = () => {
    navigate("/wb/administration/users");
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword);
  };

  return (
    <Box m="20px">
      <Paper
        sx={{
          p: 3,
          mx: 3,
          mb: 5,
          mt: 2,
          borderTop: "5px solid #000",
          borderRadius: "10px 10px 10px 10px",
        }}
      >
        {/* <Header title="CREATE USER" subtitle="Tambah User" /> */}
        <div style={{ marginBottom: "5px" }}>
          <Box display="flex" mb={5}>
            <Typography variant="h3">CREATE USER</Typography>
          </Box>
        </div>

        <Formik onSubmit={handleFormikSubmit} initialValues={initialValues} validationSchema={userSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
                >
                  <TextField
                    name="name"
                    label="Nama"
                    type="text"
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="nik"
                    label="NIK"
                    type="text"
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.nik}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.nik && !!errors.nik}
                    helperText={touched.nik && errors.nik}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="username"
                    label="Username"
                    type="text"
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.username}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    type="text"
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="position"
                    label="Posisi"
                    type="text"
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.position}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.position && !!errors.position}
                    helperText={touched.position && errors.position}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="division"
                    label="Divisi"
                    type="text"
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.division}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.division && !!errors.division}
                    helperText={touched.division && errors.division}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="phone"
                    label="Telephone"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl fullWidth size="small" sx={{ gridColumn: "span 2" }} required>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      label="Role"
                      name="role"
                      value={values.role}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.role && !!errors.role}
                      helperText={touched.role && errors.role}
                    >
                      {dtRoles &&
                        dtRoles.length > 0 &&
                        dtRoles?.map((data, index) => {
                          return (
                            <MenuItem key={index} value={data.id}>
                              {data.value}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>

                  <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="passwordConfirm"
                    label="Konfirmasi Password"
                    type={showPassword2 ? "text" : "password"}
                    required
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.passwordConfirm}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility2}>
                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!touched.passwordConfirm && !!errors.passwordConfirm}
                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                    sx={{ gridColumn: "span 2" }}
                  />

                  {/* <div sx={{ gridColumn: "span 2" }}></div> */}
                </Box>
                <Box display="flex" justifyContent="end" mt={3}>
                  <Button type="submit" variant="contained" sx={{ mb: 1 }}>
                    Simpan
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                  <Button variant="contained" disabled sx={{ mb: 1, ml: 0.5 }} onClick={() => {}}>
                    Di Non-Aktifkan
                  </Button>
                  <Button variant="contained" disabled sx={{ mb: 1, ml: 0.5 }} onClick={() => {}}>
                    Hapus
                  </Button>
                  <Button variant="contained" sx={{ mb: 1, ml: 0.5 }} onClick={handleClose}>
                    Batal
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </Box>
  );
};

export default UserCreate;
