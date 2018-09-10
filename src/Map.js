import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapMarker from "./MapMarker";

const RawMap = withScriptjs(withGoogleMap(({ sensors, selectedSensor = {}, onSensorClick }) => (
    <GoogleMap defaultZoom={14}
               defaultCenter={{ lat: 53.8554374, lng: 10.6783012 }}>

        {sensors.map(sensor => (
            <MapMarker sensor={sensor}
                       selected={sensor.sensorId === selectedSensor.sensorId}
                       onClick={onSensorClick}
                       key={sensor.sensorId} />
        ))}
    </GoogleMap>
)))

export default function Map({ style, ...rest }) {
    return (
        <div style={style}>
            <RawMap
                {...rest}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}
