import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

const RawMap = withScriptjs(withGoogleMap(({ sensors, selectedSensor = {}, onSensorClick }) => (
    <GoogleMap defaultZoom={13}
               defaultCenter={{ lat: 53.849174, lng: 10.6722478 }}>

        {sensors.map((sensor, i) => (
            <MarkerWithLabel position={{lat: sensor.latitude, lng: sensor.longitude}}
                             icon={{ url: markerIconUrl(sensor) }}
                             labelAnchor={new window.google.maps.Point(-10, 30)}
                             labelStyle={{
                                 backgroundColor: "white",
                                 fontSize: "16px",
                                 padding: "5px",
                                 border: `${sensor.sensorId === selectedSensor.sensorId ? 3 : 1}px solid grey`, 
                                 borderRadius: "3px",
                                 boxShadow: "2px 2px #eee"
                             }}
                             clickable={true}
                             onClick={() => onSensorClick(i)}
                             key={sensor.url}>
                <div>
                    {(sensor.measurements[0] || {}).value} l/h

                    {sensor.badSpot && <span> (SP)</span>}
                </div>
            </MarkerWithLabel>
        ))}
    </GoogleMap>
)))

export default function Map({ style, ...rest }) {
    return (
        <div style={style}>
            <RawMap
                {...rest}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBs8SAKGsZPB_TLjRVRkjcdFP4LrzXzcbI&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}

function markerIconUrl(sensor) {
    const measurements = sensor.measurements
    const lastMeasurement = measurements[0] || {}
    const waterFlow = lastMeasurement.value

    const redThreshold = 0;
    const yellowThreshold = 30;
    const greenThreshold = 80;
    
    if (waterFlow > redThreshold && waterFlow < yellowThreshold) {
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }
    if (waterFlow >= yellowThreshold && waterFlow < greenThreshold) {
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    }

    return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
}