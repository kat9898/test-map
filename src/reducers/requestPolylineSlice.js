import { createSlice } from '@reduxjs/toolkit'

export const requestPolylineSlice = createSlice({
    name: 'requestPolyline',
    initialState: {
      data: '',
      loading: false,
      error: false
    },
    reducers: {
      request: (state) => {
        state.data = ''
        state.loading = true
        state.error = false
      },
      requestSucceeded: (state, action) => {
        state.data = action.payload
        state.loading = false
        state.error = false
      },
      requestFailed: (state) => {
        state.data = ''
        state.loading = false
        state.error = true
      }
    }
})

export const {request, requestSucceeded, requestFailed} = requestPolylineSlice.actions

export default requestPolylineSlice.reducer