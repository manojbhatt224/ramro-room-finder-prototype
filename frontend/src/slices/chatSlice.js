import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchChatsAPI } from '../api/chatAPI';

// Fetch chats
export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchChatsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    selectedChatId: null,
    chatLoading: false,
    chatError: null,
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChatId = action.payload;
    },
    addChat: (state, action) => {
      state.chatList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.chatLoading = true;
        state.chatError = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chatList = action.payload;
        state.chatLoading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.chatLoading = false;
        state.chatError = action.chatError.message;
      });
  },
});

export const { selectChat, addChat, } = chatSlice.actions;

export const selectChatError=(state)=>state.chat.chatError
export const selectChatLoading=(state)=>state.chat.chatLoading


export default chatSlice.reducer;
