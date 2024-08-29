import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChatsAPI, createChatAPI } from '../api/chatAPI';

// Fetch chats
export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchChatsAPI();
      return response.data?.chats;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create New Chat
export const createChat = createAsyncThunk(
  'chat/createChat',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await createChatAPI(userId);
      console.log(response.data);
      return response.data?.chat;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    activeChat: null,
    newChatLoading:false,
    newChatError:null,
    chatLoading: false,
    chatError: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
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
        if (state.chatList.length > 0) {
          state.activeChat = state.chatList[0];
        } else {
          state.activeChat = null;
        }
        state.chatLoading = false;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.chatLoading = false;
        state.chatError = action.payload.data?.error;
      })
      .addCase(createChat.pending, (state) => {
        state.newChatLoading = true;
        state.newChatError = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.activeChat = action.payload;
        state.newChatLoading = false;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.newChatLoading = false;
        state.newChatError = action.payload.data?.error;
      });
  },
});

export const { setActiveChat, addChat} = chatSlice.actions;

export const selectChatList=(state)=>state.chat.chatList
export const selectActiveChat=(state)=>state.chat.activeChat
export const selectChatError=(state)=>state.chat.chatError
export const selectChatLoading=(state)=>state.chat.chatLoading


export default chatSlice.reducer;
