import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { checkingAuthentication, startGoogleSignIn, startLoginWithemailPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = {
    email: 'example@example.com',
    password: '123456'
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(x => x.auth);

    const dispatch = useDispatch();
    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(startLoginWithemailPassword({email, password}));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn(email, password));
    }

    return (
        <AuthLayout title="Login">

            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="example@example.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            required
                        />
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                type='submit'
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                onClick={onGoogleSignIn}
                                variant="contained"
                                fullWidth
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color='inherit' to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </AuthLayout>
    )
}
