import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const RawMap = withScriptjs(withGoogleMap(({ sensors, onSensorClick }) => (
    <GoogleMap defaultZoom={13}
               defaultCenter={{ lat: 53.849174, lng: 10.6722478 }}>

        {sensors.map((sensor, i) => (
            <Marker position={sensor.position}
                    icon={{ url: markerIconUrl(sensor) }}
                    clickable={true}
                    onClick={() => onSensorClick(i)}
                    key={sensor.url} />
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
    const feeds = sensor.metrics.feeds
    const lastFeed = feeds[feeds.length - 1]
    const waterFlow = Number(lastFeed.field1)

    const redThreshold = 0;
    const yellowThreshold = 30;
    const greenThreshold = 80;
    const noConsumption = 0;
    
    if (waterFlow > redThreshold && waterFlow < yellowThreshold) {
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }
    if (waterFlow >= yellowThreshold && waterFlow < greenThreshold) {
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    }
    if (waterFlow === noConsumption || waterFlow >= greenThreshold) {
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }
}