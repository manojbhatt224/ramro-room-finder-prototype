import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsersAPI, getUserAPI } from '../api/userAPI';

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getAllUsersAPI();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const getUser = createAsyncThunk(
    'users/getUser',
    async (id, { rejectWithValue }) => {
      try {
        const response = await getUserAPI(id);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const initialState = {
    users:null,
    user:null,
    usersError: null,
    usersLoading:null,
    userError: null,
    userLoading: null, 
  };
  
  export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setUsersError: (state, action) => {
        state.usersError = action.payload;
      },
      setUserError: (state, action) => {
        state.userError = action.payload;
      },
    },
    extraReducers:(builder)=>{
      builder
        .addCase(getAllUsers.pending, (state) => {
          state.usersLoading = true;
          state.usersError = null;
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
          state.usersLoading = null;
          state.users = action.payload.users;
          state.usersError = null;
        })
        .addCase(getAllUsers.rejected, (state, action) => {
          state.usersLoading = false;
          state.usersError = action.payload.data.error;
        })
        .addCase(getUser.pending, (state) => {
            state.userLoading = true;
            state.userError = null;
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.userLoading = false;
            console.log("Success Payload", action.payload)
            state.user = action.payload.user;
            state.userError = null;
        })
        .addCase(getUser.rejected, (state, action) => {
            state.userLoading = false;
            console.log("Error Payload", action.payload)
            state.userError = action.payload.data.error;
       })
    }
  });
  
  export const { setUsersError, setUserError} = usersSlice.actions;
  
  export const selectUser=(state)=>state.users.user;
  export const selectUsers = (state) => state.users.users;
  export const selectUsersError = (state) => state.users.usersError;
  export const selectUsersLoading = (state) => state.users.usersLoading;
  export const selectUserError = (state) => state.users.userError;
  export const selectUserLoading = (state) => state.users.userLoading;
  
  
  export default usersSlice.reducer;
  
  