import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItem: [],
    totalQuantity: [],
    totalPrice: []
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
                // let finalValue = state.totalPrice.reduce((accu, curEle) => accu + curEle.finalPrice, 0)
                // state.finalCartPrice = finalValue
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
                // let finalValue = state.totalPrice.reduce((accu, curEle) => accu + curEle.finalPrice, 0)
                // state.finalCartPrice = finalValue
            }

        },
        updateCart(state, action) {
            let changeQuant = state.cartItem.find(p => p.attributes.slug === action.payload.slug)
            let changeTotalQuantity = state.totalQuantity.find(p => { return p.slug === action.payload.slug })
            let changeTotalPrice = state.totalPrice.find(p => p.slug === action.payload.slug)
            if (action.payload.type === 'inc') {
                changeQuant.size.map((val) => {
                    if (val.selectedSize === action.payload.size.selectedSize) {
                        val.quantityProd++;
                        changeTotalQuantity.quantityProd++
                        changeTotalPrice.finalPrice = changeQuant.oneQuantityPrice * changeTotalQuantity.quantityProd
                        // let finalValue = state.totalPrice.reduce((accu, curEle) => accu + curEle.finalPrice, 0)
                        // state.finalCartPrice = finalValue
                    }
                })

            }
            else if (action.payload.type === 'dec') {
                changeQuant.size.map((val) => {
                    if (val.selectedSize === action.payload.size.selectedSize) {
                        if (val.quantityProd > 1) {
                            val.quantityProd--;
                            changeTotalQuantity.quantityProd--;
                            changeTotalPrice.finalPrice = changeQuant.oneQuantityPrice * changeTotalQuantity.quantityProd
                            // let finalValue = state.totalPrice.reduce((accu, curEle) => accu + curEle.finalPrice, 0)
                            // state.finalCartPrice = finalValue
                        }
                    }
                })
            }
        },
        removeCart(state, action) {
            let cartItems = state.cartItem.filter((p) => p.attributes.slug !== action.payload)
            let cartQuantity = state.totalQuantity.filter((p) => p.slug !== action.payload)
            let cartPrice = state.totalPrice.filter((p) => p.slug !== action.payload)
            state.cartItem = [...cartItems];
            state.totalQuantity = [...cartQuantity];
            state.totalPrice = [...cartPrice];
            // let finalValue = state.totalPrice.reduce((accu, curEle) => accu + curEle.finalPrice, 0)
            // state.finalCartPrice = finalValue
        }
    },
})

export default cartSlice

export const { addToCart, updateCart, removeCart } = cartSlice.actions