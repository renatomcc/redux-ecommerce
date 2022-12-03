import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [] as Object[],
        price: 0,
        productsAmount: 0
    },
    reducers: {
        addToCart: (state, action) => {
            let added = false;
            state.products.map((item: any) => {
                if (item.id === action.payload.id) {
                    item.amount += 1;
                    item.totalPrice += item.price;
                    state.price += item.price;
                    state.productsAmount += 1;
                    item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
                    state.price = parseFloat(state.price.toFixed(2));
                    added = true;
                }
                return item
            })
            if (!added) {
                state.products.push(action.payload)
                state.price += action.payload.price;
                state.productsAmount += 1;
                state.price = parseFloat(state.price.toFixed(2));
            }
        },
        removeFromCart: (state, action) => {
            state.products.map((item: any) => {
                if (item.id === action.payload.id && item.amount > 0) {
                    item.amount -= 1;
                    item.totalPrice -= item.price;
                    state.price -= item.price;
                    state.productsAmount -= 1;
                    item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
                    state.price = parseFloat(state.price.toFixed(2));
                }
                return item
            })
        },
        addOnCart: (state, action) => {
            state.products.map((item: any) => {
                if (item.id === action.payload.id) {
                    item.amount += 1;
                    item.totalPrice += item.price;
                    state.price += item.price;
                    state.productsAmount += 1;
                    item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
                    state.price = parseFloat(state.price.toFixed(2));
                }
                return item
            })
        },
        removeOnCart: (state, action) => {
            state.products.map((item: any) => {
                if (item.id === action.payload.id && item.amount > 0) {
                    item.amount -= 1;
                    item.totalPrice -= item.price;
                    state.price -= item.price;
                    state.productsAmount -= 1;
                    item.totalPrice = parseFloat(item.totalPrice.toFixed(2));
                    state.price = parseFloat(state.price.toFixed(2));
                }
                return item
            })
        },
        removeFromCartOnCart: (state, action) => {
            state.products = state.products.filter((item: any) => item.id !== action.payload.id)
        }
    }
})

export default cartSlice.reducer
export const { addToCart, removeFromCart, addOnCart, removeOnCart, removeFromCartOnCart } = cartSlice.actions