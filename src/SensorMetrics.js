import React from 'react';
import { Chart } from "react-google-charts";

export default function SensorMetrics({ measurements, style }) {
    console.log('SensorMetrics', measurements)
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style}}>
            <Chart chartType="Gauge"
                   data={[
                       ["L/h"],
                       gaugeData(measurements)
                   ]}
                   options={{ redFrom: 0, redTo: 30, yellowFrom: 30, yellowTo: 70 }}
                   style={{marginTop: 50, marginBottom: 20 }} />
            
            <Chart chartType="AreaChart"
                   data={[
                       ['Time', 'L/h'],
                       ...historyData(measurements)
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
