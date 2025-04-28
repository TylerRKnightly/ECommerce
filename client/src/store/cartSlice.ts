import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData } from "../types/product";

const loadCartFromStorage = ():CartItem[] => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
}

const initialState:CartState = {
    cartItems: loadCartFromStorage()
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ProductData>) => {
            const existingItem = state.cartItems.find(i => i._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity +=1;
            } else {
                state.cartItems.push({...action.payload, quantity: 1});
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        updateQuantity: (state, action: PayloadAction<{id:string, quantity:number}>) => {
            const item = state.cartItems.find( i=> i._id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export interface CartItem extends ProductData {
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}