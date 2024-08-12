import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchMessagesAPI } from '../api/messageAPI';

export const fetchChats = createAsyncThunk(
    'message/fetchMessages',
    async (chatId, { rejectWithValue }) => {
      try {
        const response = await fetchMessagesAPI(chatId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );



// Message slice
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: {},
    loading: false,
    error: null,
  },
//   reducers: {
//     addMessage: (state, action) => {
//       const { chatId, message } = action.payload;
//       if (!state.messages[chatId]) {
//         state.messages[chatId] = [];
//       }
//       state.messages[chatId].push(message);
//     },
//   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { chatId, messages } = action.payload;
        state.messages[chatId] = messages;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

// export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
