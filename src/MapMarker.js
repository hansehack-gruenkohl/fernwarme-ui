import React from 'react';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

export default function MapMarker({ sensor, selected, onClick }) {

    const labelPosition = new window.google.maps.Point(
                                selected ? -10 : -12,
                                selected ? 32 : 30)
    
    const labelStyle = {
        backgroundColor: "white",
        fontSize: "16px",
        padding: "5px",
        border: `${selected ? 3 : 1}px solid grey`, 
        borderRadius: "3px",
        boxShadow: "2px 2px #eee"
    }

    return (
        <MarkerWithLabel position={{lat: sensor.latitude, lng: sensor.longitude}}
                        icon={{ url: markerIconUrl(sensor) }}
                        labelAnchor={labelPosition}
                        labelStyle={labelStyle}
                        clickable={true}
                        onClick={() => onClick(sensor.sensorId)}
                        key={sensor.url}>
            <div>
                {(sensor.measurements[0] || {}).value} l/h
                {sensor.badSpot && <span> (SP)</span>}
            </div>
        </MarkerWithLabel>
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
