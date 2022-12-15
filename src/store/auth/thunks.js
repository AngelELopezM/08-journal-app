import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogOut } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage, displayName } = await registerUserWithEmailPassword({ email, password, displayName });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));
    }

}

export const startLoginWithemailPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, errorMessage, uid, displayName, photoURL } = await loginWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();
        dispatch(clearNotesLogOut());
        dispatch(logout({}));
    }
}