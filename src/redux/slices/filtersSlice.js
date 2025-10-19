import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    category: 'all',
    sort: 'none', // 'none' | 'price-asc' | 'price-desc'
    rating: 0 // 0 (none), 4.5, 4.0 etc.
  },
  reducers: {
    setSearch(state, action) { state.search = action.payload },
    setCategory(state, action) { state.category = action.payload },
    setSort(state, action) { state.sort = action.payload },
    setRating(state, action) { state.rating = action.payload },
    clearFilters(state) { state.search = ''; state.category = 'all'; state.sort = 'none'; state.rating = 0 }
  }
})

export const { setSearch, setCategory, setSort, setRating, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer
