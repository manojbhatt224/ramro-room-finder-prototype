import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListingReviewsAPI, addReviewAPI, deleteReviewAPI, updateReviewAPI } from '../api/reviewAPI';


export const getListingReviews = createAsyncThunk(
  'review/getListingReviews',
  async (listingId, { rejectWithValue }) => {
    try {
      const response = await getListingReviewsAPI(listingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const addReview = createAsyncThunk(
  'review/addReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await addReviewAPI(reviewData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async ({id, updateData}, { rejectWithValue }) => {
  

    try {
      const response = await updateReviewAPI(id, updateData); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteReviewAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  reviews:null,
  fetchError: null,
  fetchLoading:null,
  operationError: null,
  operationLoading: null,
  operationSuccess: null
};

export const reviewSlice = createSlice({
  name: 'review',
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
    .addCase(getListingReviews.pending, (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    })
    .addCase(getListingReviews.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.reviews = action.payload.reviews;
      state.fetchError = null;
    })
    .addCase(getListingReviews.rejected, (state, action) => {
      state.fetchLoading = false;
      state.fetchError = action.payload.data.error;
    })
      .addCase(addReview.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.operationLoading = false;
        console.log(action.payload)
        state.operationSuccess = "Successful"
        state.operationError = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.operationLoading = false;
        console.log(action.payload)
        state.operationError = action.payload.data.error;
      })
      .addCase(updateReview.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationSuccess = "Successful"
        state.operationError = null;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload.data.error;
      })
      .addCase(deleteReview.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationSuccess = "Successful"
        state.operationError = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload.data.error;
      })
  }
});

export const { setFetchError, setOperationError} = reviewSlice.actions;

export const selectReviews=(state)=>state.review.reviews
export const selectFetchLoading = (state) => state.review.fetchLoading;
export const selectFetchError = (state) => state.review.fetchError;
export const selectOperationLoading = (state) => state.review.operationLoading;
export const selectOperationError = (state) => state.review.operationError;
export const selectOperationSuccess = (state) => state.review.operationSuccess;


export default reviewSlice.reducer;
