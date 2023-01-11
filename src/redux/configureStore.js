
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga'
import activeRowSliceReducer from '../reducers/activeRowSlice';
import requestPolylineSliceReducer from '../reducers/requestPolylineSlice';
import {watchFetchPolyline} from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    activeRow: activeRowSliceReducer,
    requestPolyline: requestPolylineSliceReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  }
})

sagaMiddleware.run(watchFetchPolyline);