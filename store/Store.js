import cartSlice from "./slice/cartSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        cart:cartSlice.reducer
    },
  })
export default store
