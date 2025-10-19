import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchProduct } from '../../api/productsApi'

export const loadProducts = createAsyncThunk('products/loadAll', async () => {
  return await fetchProducts()
})

export const loadProductById = createAsyncThunk('products/loadById', async (id) => {
  return await fetchProduct(id)
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    activeProduct: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => { state.status = 'loading' })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(loadProductById.pending, (state) => { state.status = 'loading' })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.activeProduct = action.payload
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default productsSlice.reducer
