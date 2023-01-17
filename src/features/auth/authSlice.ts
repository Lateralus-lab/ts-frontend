import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface AuthState {
    email: string | null;
    token: string | null;
}

const initialState: AuthState = {
    email: null,
    token: null,
};

type Payload = {
    email: string | null;
    accessToken: string | null;
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<Payload>) => {
            const { email, accessToken } = action.payload;
            state.email = email;
            state.token = accessToken;
        },
        logOut: (state) => {
            state.email = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.email;
export const selectCurrentToken = (state: RootState) => state.auth.token;
