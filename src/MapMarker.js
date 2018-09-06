import React from 'react';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

export default function MapMarker({ sensor, selected, onClick }) {

    const labelPosition = new window.google.maps.Point(
                                selected ? -15 : -17,
                                selected ? 32 : 30)
    
    const labelStyle = {
        backgroundColor: sensor.underSupplied ? "#fd5656" : "white",
        fontSize: "16px",
        padding: "5px",
        border: `${selected ? 3 : 1}px solid ${selected ? 'blue' : 'grey'}`, 
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
    if (sensor.underSupplied) {
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }

    return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
}
