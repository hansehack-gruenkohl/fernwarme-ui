import React, { Component } from 'react';
import SensorMetrics from './SensorMetrics';
import Map from './Map';
import {loadSensorsWithMeasurements} from './SensorClient';
    
export default class App extends Component {

    state = {
        sensors: null,
        selectedSensorId: null
    }

    componentDidMount() {
        this.load()
        this.intervalJob = setInterval(this.load.bind(this), 1000)
    }

    async load() {
        const sensors = await loadSensorsWithMeasurements()

        console.log(sensors)
        this.setState({
            sensors
        })
    }

    handleSensorClick = (sensorId) => {
        this.setState({
            selectedSensorId: sensorId
        })
    }

    render() {
        const {sensors, selectedSensorId} = this.state
        if (!sensors) {
            return null;
        }
        const selectedSensor = sensors.filter(s => s.sensorId === selectedSensorId)[0]

        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <Map sensors={sensors}
                     selectedSensor={selectedSensor}
                     onSensorClick={this.handleSensorClick}
                     style={{flex: 1}} />

                { selectedSensor &&
                    <SensorMetrics sensor={selectedSensor} style={{ width: '30%' }}/>
                }
            </div>
        );
    }
}
