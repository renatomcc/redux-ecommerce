import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: [] as Object[],
    reducers: {
        addToStore: (state, action) => {
            state.push(action.payload)
        },
    }
})

export default productsSlice.reducer
export const { addToStore } = productsSlice.actions