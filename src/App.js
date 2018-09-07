import React, { Component } from 'react';
import SensorMetrics from './SensorMetrics';
import Map from './Map';
import {loadSensorsWithMeasurements} from './SensorClient';
import LoadingScreen from './LoadingScreen';
    
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

        if(sensors.filter((sensor) => sensor.underSupplied).length > 0){
            (new Audio('/beep.mp3')).play().catch(error => {
                // Catch the promoise erroring out, because chrome prevents
                // the browser from playing audio if the user did not interact
                // with the window first.
                // console.log('Auto play was prevented.');
            });
        }
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
            return <LoadingScreen />
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
