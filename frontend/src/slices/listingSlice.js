import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getMyListingsAPI, getAllListingsAPI, addListingAPI, getListingAPI, deleteListingAPI, updateListingAPI } from '../api/listingAPI';



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
  async (_,{ getState,rejectWithValue }) => {
    const state=getState();
    const page=state.listing.page
    const filters=state.listing.filters
    try {
      const response = await getAllListingsAPI(filters,page, 3);
      console.log(response.data);
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
  async (id, { rejectWithValue }) => {
    try {
      const response = await getListingAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteListing = createAsyncThunk(
  'listing/deleteListing',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteListingAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateListing = createAsyncThunk(
  'listing/updateListing',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateListingAPI(id, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  listing:null,
  page:1,
  listings:[],
  fetchHasMore:true,
  fetchError: null,
  fetchLoading:false,
  operationError: null,
  operationLoading: false,
  operationSuccess: null,
  filters:{} 
};

export const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    resetListings(state) {
      state.listings = [];
      state.page = 1;
      state.fetchHasMore=true;

    },
    setFetchError: (state, action) => {
      state.fetchError = action.payload;
    },
    setOperationError: (state, action) => {
      state.operationError = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; // Reset to page 1 when filters change
      state.listings = []; // Clear current listings to fetch new filtered data
    },
    clearFilters: (state) => {
      state.filters = {};
      state.page = 1; // Reset to page 1 when filters are cleared
      state.listings = []; // Clear current listings to fetch unfiltered data
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getListing.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    })
    .addCase(getListing.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.listing = action.payload.listing;
      state.fetchError = null;
    })
    .addCase(getListing.rejected, (state, action) => {
      state.fetchLoading = false;
      state.fetchError = action.payload.data.error;
    })
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
        const incoming = Array.isArray(action.payload?.listings) ? action.payload.listings : [];
        const existingIds = new Set(state.listings.map((listing) => listing._id));
        const uniqueIncoming = incoming.filter((listing) => listing?._id && !existingIds.has(listing._id));

        state.fetchLoading = false;
        state.listings = [...state.listings, ...uniqueIncoming];
        state.page += 1;
        state.fetchError = null;
        state.fetchHasMore = action.payload.currentPage < action.payload.totalPages;
      })
      .addCase(getAllListings.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload?.data?.error;
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
      .addCase(deleteListing.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationError = null;
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload?.data?.error;
      })
      .addCase(updateListing.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationError = null;
        state.listing = action.payload.data;
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload?.data?.error;
      })
  }
});


export const { setFetchError, setOperationError, resetListings, setFilters, clearFilters} = listingSlice.actions;
export const selectListings=(state)=>state.listing.listings
export const selectPage=(state)=>state.listing.page
export const selectFetchHasMore=(state)=>state.listing.fetchHasMore
export const selectListing=(state)=>state.listing.listing
export const selectFetchLoading = (state) => state.listing.fetchLoading;
export const selectFetchError = (state) => state.listing.fetchError;
export const selectOperationLoading = (state) => state.listing.operationLoading;
export const selectOperationError = (state) => state.listing.operationError;
export const selectOperationSuccess = (state) => state.listing.operationSuccess;


export default listingSlice.reducer;
