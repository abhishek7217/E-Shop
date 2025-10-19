import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import likesReducer from './slices/likesSlice'
import filtersReducer from './slices/filtersSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    likes: likesReducer,
    filters: filtersReducer
  }
})

export default store
