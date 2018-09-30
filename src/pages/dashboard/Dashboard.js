import React from 'react';
import SensorMetrics from './components/SensorMetrics';
import Map from './components/Map';
import {loadSensors, loadBadSpot, loadBadSpotHistory, loadUndersuppliedSpots, fetchPressureThreshold } from '../../services/SensorClient';
import LoadingScreen from './components/LoadingScreen';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    const pressureThreshold = await fetchPressureThreshold()

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
      undersuppliedSpots,
      pressureThreshold
    })
  }

  handleSensorClick = (sensorId) => {
    this.setState({
      selectedSensorId: sensorId
    })
  }

  render() {
    const {sensors,badSpot, selectedSensorId, badSpotHistory, undersuppliedSpots, pressureThreshold} = this.state
    if (!sensors) {
      return <LoadingScreen />
      }

    const badSpotSensor = sensors.filter(s => s.sensorId === badSpot.sensor.sensorId)[0]
    const selectedSensor = sensors.filter(s => s.sensorId === selectedSensorId)[0]

    return <div style={{ display: 'flex', height: '100vh', flexDirection: 'row wrap', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', width: '100%', height: '10%', justifyContent: 'center'}}>
        <Card style={{ flex: '0 15%', height: '100%'}}>
          <CardContent>
            <Typography>Pressure Threshold</Typography>
            <Typography variant="headline" component="h2">{ pressureThreshold } mBar</Typography>
          </CardContent>
        </Card>
        <Card style={{ flex: '0 15%', height: '100%'}}>
          <CardContent>
            <Typography>Bad Spot Pressure</Typography>
            <Typography variant="headline" component="h2">{ badSpot.measurement.value } mBar</Typography>
          </CardContent>
        </Card>
        <Card style={{ flex: '0 15%', height: '100%'}}>
          <CardContent>
            <Typography>Undersupplied Spots</Typography>
            <Typography variant="headline" component="h2">{ undersuppliedSpots.sensors.length }</Typography>
          </CardContent>
        </Card>
      </div>
      <Map sensors={sensors}
        badSpotSensor={badSpotSensor}
        badSpotHistory={badSpotHistory}
        undersuppliedSpots={undersuppliedSpots}
        selectedSensor={selectedSensor}
        onSensorClick={this.handleSensorClick}
        style={{height: '90%', flex: '1 70%'}} />

      <SensorMetrics sensor={selectedSensor} style={{ width: '30%' }}/>
    </div>
    }
}
