import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find(i => i.id === product.id)
      state.totalQuantity++
      state.totalPrice = +(state.totalPrice + product.price).toFixed(2)
      if (existing) existing.quantity += 1
      else state.items.push({ ...product, quantity: 1 })
    },
    removeFromCart(state, action) {
      const id = action.payload
      const existing = state.items.find(i => i.id === id)
      if (!existing) return
      state.totalQuantity -= existing.quantity
      state.totalPrice = +(state.totalPrice - existing.price * existing.quantity).toFixed(2)
      state.items = state.items.filter(i => i.id !== id)
    },
    changeQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if (!item) return
      state.totalQuantity += (quantity - item.quantity)
      state.totalPrice = +(state.totalPrice + (quantity - item.quantity) * item.price).toFixed(2)
      item.quantity = quantity
      if (item.quantity <= 0) state.items = state.items.filter(i => i.id !== id)
    },
    clearCart(state) {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    }
  }
})

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
