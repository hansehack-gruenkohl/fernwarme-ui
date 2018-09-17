import React, { Component } from 'react';
import SensorMetrics from './components/SensorMetrics';
import Map from './components/Map';
import {loadSensors, loadBadSpot} from '../../services/SensorClient';
import LoadingScreen from './components/LoadingScreen';

export default class Dashboard extends React.Component {

    state = {
        sensors: null,
        selectedSensorId: null
    }

    componentDidMount() {
        this.load()
        this.intervalJob = setInterval(this.load.bind(this), 1000)
    }

    async load() {
        const sensors = await loadSensors()
        const badSpot = await loadBadSpot()

        if(badSpot.underSupplied){
            (new Audio('/beep.mp3')).play().catch(error => {
                // Catch the promoise erroring out, because chrome prevents
                // the browser from playing audio if the user did not interact
                // with the window first.
                // console.log('Auto play was prevented.');
            });
        }
        this.setState({
          sensors,
          badSpot
        })
    }

    handleSensorClick = (sensorId) => {
        this.setState({
            selectedSensorId: sensorId
        })
    }

    render() {
        const {sensors,badSpot, selectedSensorId} = this.state
        if (!sensors) {
            return <LoadingScreen />
        }

        const badSpotSensor = sensors.filter(s => s.sensorId === badSpot.sensor.sensorId)[0]
        const selectedSensor = sensors.filter(s => s.sensorId === selectedSensorId)[0]

        return <div style={{ display: 'flex', height: '100vh' }}>
          <Map sensors={sensors}
            badSpotSensor={badSpotSensor}
            selectedSensor={selectedSensor}
            onSensorClick={this.handleSensorClick}
            style={{flex: 1}} />

          { selectedSensor &&
          <SensorMetrics sensor={selectedSensor} style={{ width: '30%' }}/>
          }
        </div>
        }
}

