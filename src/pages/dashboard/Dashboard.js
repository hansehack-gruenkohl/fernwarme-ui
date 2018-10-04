import React from 'react';
import SensorMetrics from './components/SensorMetrics';
import Map from './components/Map';
import {loadSensors, loadBadSpot, loadBadSpotHistory, loadUndersuppliedSpots} from '../../services/SensorClient';
import LoadingScreen from './components/LoadingScreen';

export default class Dashboard extends React.Component {

  state = {
    sensors: null,
    selectedSensorId: null,
    badSpotHistory: []
  }

  componentDidMount() {
    this.load()
    this.intervalJob = setInterval(this.load.bind(this), 1000)
  }

  async load() {
    const sensors = await loadSensors()
    const badSpot = await loadBadSpot()
    const badSpotHistory = await loadBadSpotHistory()
    const undersuppliedSpots = await loadUndersuppliedSpots()

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
      badSpot,
      badSpotHistory,
      undersuppliedSpots
    })
  }

  handleSensorClick = (sensorId) => {
    this.setState({
      selectedSensorId: sensorId
    })
  }

  render() {
    const {sensors,badSpot, selectedSensorId, badSpotHistory, undersuppliedSpots} = this.state
    if (!sensors) {
      return <LoadingScreen />
      }

    const badSpotSensor = sensors.filter(s => s.sensorId === badSpot.sensor.sensorId)[0]
    const selectedSensor = sensors.filter(s => s.sensorId === selectedSensorId)[0]

    return <div style={{ display: 'flex', height: '100vh', flexDirection: 'row wrap', flexWrap: 'wrap' }}>
      <Map sensors={sensors}
        badSpotSensor={badSpotSensor}
        badSpotHistory={badSpotHistory}
        undersuppliedSpots={undersuppliedSpots}
        selectedSensor={selectedSensor}
        onSensorClick={this.handleSensorClick}
        style={{height: '90%', flex: '1 80%'}} />

      <SensorMetrics sensor={selectedSensor} style={{ width: '20%' }}/>
    </div>
    }
}
