import React from 'react';
import { Chart } from "react-google-charts";

export default function SensorMetrics({ sensor, style }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style}}>
            <h2 style={{ marginTop: 50 }}>{sensor.name}</h2>
            <Chart chartType="Gauge"
                   data={[
                       ["L/h"],
                       gaugeData(sensor.measurements)
                   ]}
                   options={{ redFrom: 0, redTo: 30, yellowFrom: 30, yellowTo: 70 }}
                   style={{marginTop: 30, marginBottom: 20 }} />
            
            <Chart chartType="AreaChart"
                   data={[
                       ['Time', 'L/h'],
                       ...historyData(sensor.measurements)
                   ]}
                   options={{
                       title: 'History',
                       vAxis: { title: 'L/h' },
                       legend: { position: 'none' }
                   }}
                   // For tests
                   width="100%"
                   rootProps={{ 'data-testid': '1' }} />
        </div>
    )
}

function gaugeData(measurements) {
    const lastMeasurement = measurements[0] || {}
    return [
        lastMeasurement.value || 0
    ]
}

function historyData(measurements) {
    return measurements.map(m => {
        const date = new Date(m.measuredAt)
        return [date, m.value || 0]
    })
}
