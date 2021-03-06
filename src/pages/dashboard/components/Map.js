import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import MapMarker from "./MapMarker";

const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCU6Dz9ZWKxO8fkco490PHhipeqH2u13iw&v=3.exp&libraries=visualization,geometry,drawing,places"
const RawMap = withScriptjs(withGoogleMap(({ sensors, badSpotSensor = {}, selectedSensor = {}, badSpotHistory = [], undersuppliedSpots = {}, onSensorClick }) => (
    
    <GoogleMap defaultZoom={14}
               defaultCenter={{ lat: 53.8554374, lng: 10.6783012 }}>
               {sensors.map(sensor =>( 
               <MapMarker sensor={sensor}
                 badSpot={sensor.sensorId === badSpotSensor.sensorId}
                 undersupplied={(undersuppliedSpots.sensors.map((s) => s.sensorId)).includes(sensor.sensorId)}
                 selected={sensor.sensorId === selectedSensor.sensorId}
                 onClick={onSensorClick}
                 key={sensor.sensorId} />
               ))}
               <HeatmapLayer options={{radius: 100}} data={toDataPoint(badSpotHistory)} />
    </GoogleMap>
)))

export default function Map({ style, ...rest }) {
    return (
        <div style={style}>
            <RawMap
                {...rest}
                isMarkerShown
                googleMapURL={url}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

function toDataPoint(badSpots) {
  return badSpots.map(b => ({ location: new window.google.maps.LatLng(b.sensor.latitude, b.sensor.longitude), weight: 1 }) )
}
