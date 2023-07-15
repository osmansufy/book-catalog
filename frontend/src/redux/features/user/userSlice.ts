import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../../lib/firebase";

interface RegisterData {
  email: string;
  password: string;
}

interface IState {
  user: {
    email: string | null;
    [key: string]: any;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: IState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data: RegisterData) => {
    const { email, password } = data;

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return response.user;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; [key: string]: any }) => {
    const { email, password } = data;

    const response = await signInWithEmailAndPassword(auth, email, password);

    return response.user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        email: string | null;
        [key: string]: any;
      }>
    ) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message || "Something went wrong";
      state.user = {
        email: null,
      };
    });

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message || "Something went wrong";
      state.user = {
        email: null,
      };
    });
  },
});

export const { setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
