import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers : {
        addToCart(state,action) {
            const product = action.payload;
            // Normalisasi id produk supaya konsisten (_id atau id).
            const productId = product?._id ?? product?.id;
            if (!productId) return;

            const existingProduct = state.cartItems.find(item => item.id === productId);
            if(existingProduct){
                existingProduct.quantity = (existingProduct.quantity ?? 1) + 1;
            } else {
                state.cartItems.push({...product, id: productId, quantity: 1});
            }
            state.cartTotalQuantity = (state.cartTotalQuantity ?? 0) + 1;
        },
        removeFromCart(state,action) {
            const id = action.payload;
            const existingProduct = state.cartItems.find(item => item.id === id);
            if(!existingProduct) return;

            // Hapus item dan kurangi total kuantitas sesuai jumlahnya.
            state.cartItems = state.cartItems.filter(item => item.id !== id);
            const qty = existingProduct.quantity ?? 0;
            state.cartTotalQuantity = Math.max(0, (state.cartTotalQuantity ?? 0) - qty);
        },
        decreaseFromCart(state,action) {
            const id = action.payload;
            const existingProduct = state.cartItems.find(item => item.id === id);
            if(!existingProduct || !existingProduct.quantity) return;

            if (existingProduct.quantity <= 1) {
                // Kalau tinggal 1, sekalian hapus item.
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            } else {
                existingProduct.quantity -= 1;
            }

            state.cartTotalQuantity = Math.max(0, (state.cartTotalQuantity ?? 0) - 1);
        }
    }
})

export const {addToCart, removeFromCart, decreaseFromCart} = cartSlice.actions;
export default cartSlice.reducer;
