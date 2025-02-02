import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
    },
    reducers:{
        incrementQuantity: (state, action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id);
            if(itemPresent) {
                itemPresent.quantity++;
            } else{
                state.cart.push({...action.payload, quantity: 1});
            }
        },
        decrementQuantity: (state, action) => {
            const itemPresent = state.cart.find((item) => item.id === action.payload.id); 
            if(itemPresent.quantity === 1){
                itemPresent.quantity = 0;
                const removeItem  = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;
            } else {
                itemPresent.quantity--;
            }
        },
    }
});

export const {incrementQuantity, decrementQuantity} = CartSlice.actions;
export default CartSlice.reducer;