import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";









// Get items
export const getItemThunk = createAsyncThunk("api/getdata", async () => {
  const res = await axios.get("http://localhost:8000/data");
  return res.data;
});

// Post new item
export const postItemThunk = createAsyncThunk("api/postdata", async (data) => {
  const res = await axios.post("http://localhost:8000/data", data);
  return res.data;
});

// Delete item
export const deleteItemThunk = createAsyncThunk("api/deletedata", async (id) => {
  await axios.delete(`http://localhost:8000/data/${id}`);
  return id;
});

// Get likes
export const getLikeItemThunk = createAsyncThunk("api/getlike", async () => {
  const res = await axios.get("http://localhost:8000/like");
  return res.data;
});

// Post like
export const postLikeItemThunk = createAsyncThunk("api/postlike", async (data) => {
  try {
    const res = await axios.get("http://localhost:8000/like");
    const likes = res.data.find(item => item.name === data.name);

    if (likes) {
      return { error: 'sebetde var' }; // Mövcud bəyənmə mesajını qaytarın
    } else {
      await axios.post("http://localhost:8000/like", data);
      return data; // Yeni bəyənməni qaytarın
    }
  } catch (error) {
    return { error: 'Xəta baş verdi' }; // Xətanı idarə edin
  }
});

// Delete like
export const deleteLikeItemThunk = createAsyncThunk("api/deletelike", async (id) => {
  await axios.delete(`http://localhost:8000/like/${id}`);
  return id;
});




export const ItemSlice = createSlice({
    name: 'item',
    initialState: {
      item: [],
      likes: [],
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getItemThunk.fulfilled, (state, action) => {
          state.item = action.payload;
        })
        .addCase(getLikeItemThunk.fulfilled, (state, action) => {
          state.likes = action.payload;
        })
        .addCase(postLikeItemThunk.fulfilled, (state, action) => {
          if (action.payload.error) {
            alert(action.payload.error); // Əgər bəyənmə varsa, bildiriş ver
          } else {
            state.likes.push(action.payload); // Yeni bəyənmə əlavə et
          }
        })
        .addCase(deleteLikeItemThunk.fulfilled, (state, action) => {
          state.likes = state.likes.filter(like => like.id !== action.payload);
        })
        .addCase(postItemThunk.fulfilled, (state, action) => {
          state.item.push(action.payload);
        })
        .addCase(deleteItemThunk.fulfilled, (state, action) => {
          state.item = state.item.filter(item => item.id !== action.payload);
        })
        .addCase(getItemThunk.rejected, (state, action) => {
          state.error = action.error.message;
        })
        .addCase(getLikeItemThunk.rejected, (state, action) => {
          state.error = action.error.message;
        });
    }
  });
  
  export default ItemSlice.reducer;
  