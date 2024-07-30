import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, signupAPI } from '../api/authAPI';

const loadFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);  
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value ? JSON.parse(value) : null; // Parse JSON or return null if not present
};

const initialState = {
  // user: loadFromLocalStorage('user') || null,
  // token: loadFromLocalStorage('token') || null,
  // isAuthenticated: localStorage.getItem('isAuthenticated') || null,
  user:null,
  token:null,
  isAuthenticated:null,
  error: null,
  loading:false,
  success:null
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Make API call to authenticate user
      const response = await loginAPI(username, password); // Implement this function in your API module
      return response.data; // Assuming your API returns user data and token upon successful login
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error and return appropriate data
    }
  }
);

// Async thunk for signup
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ firstName, lastName, username, email, password, confirm_password }, { rejectWithValue }) => {
    try {
      // Make API call to register user
      const response = await signupAPI(firstName, lastName, username, email, password, confirm_password ); // Implement this function in your API module
      return response.data; // Assuming your API returns user data and token upon successful signup
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error and return appropriate data
    }
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTokens: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      // localStorage.removeItem('isAuthenticated');
      state.user = null;
      state.token=null;
      state.isAuthenticated=null;
    },
    setLoading: (state, action)=>{
      state.loading=action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsAuthenticated:(state, action)=>{
      state.isAuthenticated=action.payload;
    },
    setSuccess: (state,action)=>{
      state.success=action.payload
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Assuming action.payload contains user data
        state.token = action.payload.token; // Assuming action.payload contains token
      //  localStorage.setItem('isAuthenticated', true);
      //   localStorage.setItem('user', JSON.stringify(action.payload.user));
      //   localStorage.setItem('token', JSON.stringify(action.payload.token));
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated=null;
        state.user=null;
        state.token=null;
        state.error = action.payload.data.error;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success=action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.error || "Technical Error";
      });
  }
});

export const { setUser, setLoading, setTokens, logout, setError, setSuccess, setIsAuthenticated} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectSuccess=(state)=>state.auth.success;

export default authSlice.reducer;
