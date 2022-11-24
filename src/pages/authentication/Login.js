import Copyright from '../../components/Copyright';
import { useAuthDispatcher } from '../../providers/AuthProvider/hooks/useAuthDispatcher';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthState } from '../../providers/AuthProvider/hooks/useAuthState';
import { Avatar, Box, Checkbox, TextField, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { LockOutlined } from '@mui/icons-material';
import { apiUrls, httpClient } from '../../utils/client';
import notifiyErrors from '../../utils/notifiyErrors';
import UBLogo from '../../images/UB-logo.png';
import * as React from 'react';

const Login = () => {
    const navigate = useNavigate()
    const { authState: { isLogged } } = useAuthState()
    const { login } = useAuthDispatcher();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = e =>
        setUsername(e.target.value);

    const handleChangePassword = e =>
        setPassword(e.target.value);

    const handleSubmit = async() => {
        try {
            const { data } = await httpClient.post(apiUrls.authentication.login, { username, password})

            if (data) {
                navigate('/tramites')
                const { user, token} = data
                login({ user, token});
            }
        } catch (e) {
            notifiyErrors(e)
        }
    };

    useEffect(() => {
        if(isLogged){
            navigate('/categorias')
        }
    }, [])

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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    <Button type="button" onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Entrar
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/registro" >
                                No tenes una cuenta? Inscribite
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default Login
