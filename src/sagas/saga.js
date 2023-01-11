import {request, requestSucceeded, requestFailed} from '../reducers/requestPolylineSlice';
import {put, call, select, takeEvery} from 'redux-saga/effects';
import {sagaActions} from './sagaActions';
import polyline from '@mapbox/polyline';
import { urlSelector } from '../selectors/selectors';

export function* watchFetchPolyline() {
  yield takeEvery(sagaActions.FETCH_POLYLINE, requestPolyline);
}
  
export function* requestPolyline() {
  const url = yield select(urlSelector);

  try {
    yield put(request());
    const data = yield call(() => {
      return fetch(url).then(res => res.json())
    });
    const polylines = yield polyline.decode(data.routes[0].geometry);
    yield put(requestSucceeded(polylines));
  } catch (error) {
    yield put(requestFailed()); 
  }
}