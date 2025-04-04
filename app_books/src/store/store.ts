// store.ts
import { configureStore, createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    setBooks: (state, action) => action.payload,
  },
});

export const { setBooks } = booksSlice.actions;

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
});
