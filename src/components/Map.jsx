import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {MapContainer, TileLayer, Marker, Popup, useMap, Polyline, FeatureGroup} from 'react-leaflet';
import './Map.scss';
import { sagaActions } from '../sagas/sagaActions';
import {activeRowDetailsSelector, polylineSelector} from '../selectors/selectors';

export const Map = () => {
  const dispatch = useDispatch();
  const activeRowDetails = useSelector(activeRowDetailsSelector);
  const polylineInfo = useSelector(polylineSelector);

  const start = [activeRowDetails?.fromLat, activeRowDetails?.fromLng];
  const end = [activeRowDetails?.toLat, activeRowDetails?.toLng];

  const position = start;

  useEffect(() => {
    dispatch({type: sagaActions.FETCH_POLYLINE});
  }, [activeRowDetails]);


  function Zoom() {
    const map = useMap();
    map.fitBounds([start, end, polylineInfo]);

    return (
        <FeatureGroup>
          <Marker position={start}>
            <Popup>
              Адрес отправки
            </Popup>
          </Marker>
          <Marker position={end}>
            <Popup>
              Адрес доставки
            </Popup>
          </Marker>
          <Polyline positions={polylineInfo}></Polyline>
        </FeatureGroup>
    )
  }

  return (
    <div>
      <MapContainer className='map' center={position} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Zoom />
      </MapContainer>
    </div>
  )
}

export default Map