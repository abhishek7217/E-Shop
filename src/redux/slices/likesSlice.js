import { createSlice } from '@reduxjs/toolkit'

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likedIds: {}
  },
  reducers: {
    toggleLike(state, action) {
      const id = action.payload
      if (state.likedIds[id]) {
        delete state.likedIds[id]
      } else {
        state.likedIds[id] = true
      }
    },
    clearLikes(state) {
      state.likedIds = {}
    }
  }
})

export const { toggleLike, clearLikes } = likesSlice.actions
export default likesSlice.reducer
