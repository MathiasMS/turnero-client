import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../components/Copyright";
import { toast } from 'react-toastify';
import Grid from "@mui/material/Grid";
import { httpClient, apiUrls } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';
import UBLogo from '../../images/UB-logo.png';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = async() => {
      try {
          const { data } = await httpClient.post(apiUrls.authentication.signUp, { username, password})

          if (data) {
              toast.success("Cuenta creada exitosamente!")
              navigate('/login')
          }
      } catch (e) {
          console.log(e)
          notifiyErrors(e)
      }
    }

    const navigate = useNavigate()

    const handleChangeUsername = e =>
        setUsername(e.target.value);

    const handleChangePassword = e =>
        setPassword(e.target.value);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <img width="auto" src={UBLogo} alt="ub-logo" />
                <Box sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={handleChangeUsername}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handleChangePassword}
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button type="button" onClick={register} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Registro
                    </Button>
                </Box>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                           Ya tenes una cuenta? Login
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default Register;
