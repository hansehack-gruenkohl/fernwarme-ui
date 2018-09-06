import React from 'react';
import { Chart } from "react-google-charts";

export default function SensorMetrics({ feeds, style }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style}}>
            <Chart chartType="Gauge"
                   data={[
                       ["L/h"],
                       gaugeData(feeds)
                   ]}
                   options={{ redFrom: 0, redTo: 30, yellowFrom: 30, yellowTo: 70 }}
                   style={{marginTop: 50, marginBottom: 20 }} />
            
            <Chart chartType="AreaChart"
                   data={[
                       ['Time', 'L/h'],
                       ...historyData(feeds)
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

function gaugeData(feeds) {
    const lastFeed = feeds[feeds.length-1]
    return [
        Number(lastFeed.field1)
    ]
}

function historyData(feeds) {
    return feeds.map(f => {
        const date = new Date(f.created_at)
        return [date, Number(f.field1)]
    })
}
