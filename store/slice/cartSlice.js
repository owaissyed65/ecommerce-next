import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItem: [],
    totalQuantity: [],
    totalPrice: [],
    finalCartPrice: 0
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            let item = state.cartItem.find(p => { return p.id === action.payload.id });
            let existSlugQuantity = state.totalQuantity.find(p => p.slug === action.payload.attributes.slug)
            let existSlugPrice = state.totalPrice.find(p => p.slug === action.payload.attributes.slug);
            if (item && existSlugQuantity && existSlugPrice) {
                existSlugQuantity.quantityProd++;
                existSlugPrice.finalPrice = existSlugQuantity.quantityProd * action.payload.oneQuantityPrice
                let finalValue = state.totalPrice.reduce((accu, curEle) => accu + curEle.finalPrice, 0)
                state.finalCartPrice = finalValue
                action.payload.size.map((val) => {
                    let existSize = item.size.find(p => { return p.selectedSize === val.selectedSize })
                    if (existSize) {
                        existSize.quantityProd++
                    } else {
                        let size = action.payload.size.map((val) => {
                            return {
                                ...val,
                                quantityProd: 1
                            }
                        })
                        item.size.push(...size)
                    }
                })
            } else {
                let size = action.payload.size.map((val) => {
                    return {
                        ...val,
                        quantityProd: 1
                    }
                })
                let quantity = {
                    slug: action.payload.attributes.slug,
                    quantityProd: 1
                }
                let price = {
                    slug: action.payload.attributes.slug,
                    finalPrice: action.payload.oneQuantityPrice
                }
                state.cartItem.push({ ...action.payload, size })
                state.totalQuantity.push({ ...quantity })
                state.totalPrice.push({ ...price })
                let finalValue = state.totalPrice.reduce((accu, curEle) => accu + curEle.finalPrice, 0)
                state.finalCartPrice = finalValue
            }
        },
        updateCart(state,action){
            
        },
    },
})

export default cartSlice

export const { addToCart, updateCart } = cartSlice.actions