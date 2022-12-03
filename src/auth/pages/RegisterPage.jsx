import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [value => value.includes('@'), 'Email must have an @'],
    password: [value => value.length >= 6, 'Password must be at least 6 letters'],
    displayName: [value => value.length >= 1, 'Name is required'],
}

export const RegisterPage = () => {

    const { formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid, } = useForm(formData, formValidations);

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(x => x.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const [formSubmitted, setFormSubmitted] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (
        <AuthLayout title="Register">
            <h1>FormValid: {isFormValid ? 'Valid' : 'invalid'}</h1>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Full name"
                            type="text"
                            placeholder="John Smith"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="example@example.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
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
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
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
                            display={!!errorMessage? '' : 'none'}
                        >
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isCheckingAuthentication}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>Ya tienes una cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </AuthLayout >
    )
}
