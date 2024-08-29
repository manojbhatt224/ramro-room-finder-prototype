import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMessagesAPI } from '../api/messageAPI';

export const fetchMessages = createAsyncThunk(
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
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("Messages payload:", action.payload)
        const { chatId, messages } = action.payload;
        state.messages= messages;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        console.log("Messages error:", action.error)
        state.loading = false;
        state.error = action.error.message;
      })
  },
});


export default messageSlice.reducer;


export const { addMessage} = messageSlice.actions;

export const selectMessages=(state)=>state.message.messages
export const selectLoading=(state)=>state.message.loading