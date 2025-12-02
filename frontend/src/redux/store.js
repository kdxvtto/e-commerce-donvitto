import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/loginSlice";
import cartReducer from "./slice/cartSlice";

// Buat store global untuk aplikasi
export const store = configureStore({
    reducer : {
        auth : authSlice,
        cart : cartReducer

    }
});

// Log state awal untuk debugging
console.log("ON STORE",store.getState());

// Log setiap perubahan state (opsional untuk pantau alur)
store.subscribe(() => {
    console.log("ON STORE CHANGE",store.getState());
});
