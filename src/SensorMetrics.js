import React from 'react';
import { Chart } from "react-google-charts";

export default function SensorMetrics({ sensor, style }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style}}>
            <h2 style={{ margin: '50px 20px', textAlign: 'center' }}>{sensor.name}</h2>
            <Chart chartType="Gauge"
                   data={[
                       ["L/h"],
                       gaugeData(sensor.measurements)
                   ]}
                   style={{marginBottom: 20 }} />
            
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
