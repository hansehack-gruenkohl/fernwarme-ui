import React, { Component } from 'react';
import SensorMetrics from './SensorMetrics';
import Map from './Map';
import { config } from './config';
    
export default class App extends Component {

    state = {
        sensors: null,
        selectedSensorIndex: null
    }

    componentDidMount() {
        this.load()

        this.intervalJob = setInterval(this.load.bind(this), 1000*10)
    }

    load() {
        const requests = config.map(sensor => {
            return fetch(sensor.url)
                .then(response => response.json())
                .then(response => ({ ...sensor, metrics: response }))
        })

        Promise.all(requests).then(sensors => {
            this.setState({
                sensors
            })
        })
    }

    handleSensorClick = (sensorIndex) => {
        this.setState({
            selectedSensorIndex: sensorIndex
        })
    }

    render() {
        const {sensors, selectedSensorIndex} = this.state
        if (!sensors) {
            return null;
        }
        const selectedSensor = sensors[selectedSensorIndex]

        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <Map sensors={sensors} onSensorClick={this.handleSensorClick} style={{flex: 1}}></Map>
                { selectedSensor &&
                    <SensorMetrics feeds={selectedSensor.metrics.feeds} style={{ width: '30%' }}/>
                }
            </div>
        );
    }
}
