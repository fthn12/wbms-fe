import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Container, Grid, Paper, TextField, InputAdornment, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../../hooks";

const initialValues = { username: "", password: "" };

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setCredentials, useSigninMutation } = useAuth();
  const [signin, { isLoading }] = useSigninMutation();

  const [values, setValues] = useState(initialValues);

  const from = location.state?.from?.pathname || "/wb";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signin(values).unwrap();

      if (!!!res?.status) {
        toast.error(res.message);

        return;
      }

      setCredentials({ ...res.data });

      navigate(from, { replace: true });
    } catch (err) {
      // toast.error(err?.data?.message || err.error);

      if (!!!err?.status) {
        toast.error("No server response.");
      } else if (err.status === 400) {
        toast.error("Missing Username or Password");
      } else if (err.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login failed.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    // if (user) navigate("/wb");

    return () => {};
  }, [navigate, user]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Grid container spacing={2} direction="column" justifyContent="center" sx={{ height: "calc(100vh - 64px)" }}>
          <Paper elevation={2} sx={{ px: 5, pt: 2, pb: 4 }}>
            <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>
              <p>Sign in to your account</p>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    name="username"
                    type="text"
                    fullWidth
                    label="Username"
                    placeholder="Username"
                    variant="outlined"
                    autoComplete="username"
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    label="Password"
                    placeholder="Password"
                    variant="outlined"
                    autoComplete="username"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" fullWidth>
                    Sign In
                  </Button>
                </Grid>
                {/* <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                name="username"
                placeholder="Username"
                autoComplete="username"
                value={values.username}
                onChange={(e) => handleInputChange(e)}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="password"
                value={values.password}
                onChange={(e) => handleInputChange(e)}
              />
            </InputGroup>
            <Row>
              <Col xs={6}>
                <Button type="submit" color="primary" className="px-4">
                  Sign In
                </Button>
              </Col>
            </Row> */}
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default SignIn;
