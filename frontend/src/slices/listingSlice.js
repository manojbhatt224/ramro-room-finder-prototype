import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getMyListingsAPI, getAllListingsAPI, addListingAPI, getListingAPI } from '../api/listingAPI';


export const getMyListings = createAsyncThunk(
  'listing/getMyListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyListingsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getAllListings = createAsyncThunk(
  'listing/getAllListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllListingsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addListing = createAsyncThunk(
  'listing/addListing',
  async (listingData, { getState, rejectWithValue }) => {
    const state=getState();
    const userId = state.auth.user?._id;
    if (userId) {
      listingData.append('userId', userId);
    }
    try {
      const response = await addListingAPI(listingData); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getListing = createAsyncThunk(
  'listing/getListing',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await getListingAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  listings:null,
  fetchError: null,
  fetchLoading:null,
  operationError: null,
  operationLoading: null,
  operationSuccess: null 
};

export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    setOperationError: (state, action) => {
      state.operationError = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder
      .addCase(getMyListings.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(getMyListings.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.listings = action.payload.listings;
        state.fetchError = null;
      })
      .addCase(getMyListings.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload.data.error;
      })
      .addCase(getAllListings.pending, (state) => {
        state.fetchLoading = true;
        state.fetchError = null;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.listings = action.payload.listings;
        state.fetchError = null;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload.data.error;
      })
      .addCase(addListing.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
        state.operationSuccess=null;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationError = null;
        state.operationSuccess=true;
      })
      .addCase(addListing.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload.data.error;
      })
  }
});

export const { setFetchError, setOperationError} = listingSlice.actions;

export const selectListings=(state)=>state.listing.listings
export const selectFetchLoading = (state) => state.listing.fetchLoading;
export const selectFetchError = (state) => state.listing.fetchError;
export const selectOperationLoading = (state) => state.listing.operationLoading;
export const selectOperationError = (state) => state.listing.operationError;
export const selectOperationSuccess = (state) => state.listing.operationSuccess;


export default listingSlice.reducer;
