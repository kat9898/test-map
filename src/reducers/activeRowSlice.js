import { createSlice } from '@reduxjs/toolkit'
import data from '../data.json';

export const activeRowSlice = createSlice({
    name: 'activeRow',
    initialState: {
      id: 0,
      rowDetails: data[0],
      polylineUrl: `http://router.project-osrm.org/route/v1/driving/${data[0].fromLng},${data[0].fromLat};${data[0].toLng},${data[0].toLat}?overview=full`
    },
    reducers: {
      change: (state, action) => {
        state.id = action.payload.id;
        state.rowDetails = action.payload.rowDetails;
        const start = [action.payload.rowDetails?.fromLat, action.payload.rowDetails?.fromLng];
        const end = [action.payload.rowDetails?.toLat, action.payload.rowDetails?.toLng];
        state.polylineUrl = `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full`;
      }
    }
})

export const {change} = activeRowSlice.actions

export default activeRowSlice.reducer