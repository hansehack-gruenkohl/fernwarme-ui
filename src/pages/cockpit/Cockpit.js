import React from 'react';
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import SimulatedSensor from './components/SimulatedSensor';
import {sendSensorData, loadSensors, fetchPressureThreshold, sendPressureThreshold} from '../../services/SensorClient';

class Cockpit extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      sensors: [],
      runSimulation: false,
      pressureThreshold: 0
    } 
    this.onSensorValueChanged.bind(this)
  }

  componentDidMount() {
    this.loadAllSensors()
    this.loadPressureThreshold()
    this.intervalJob = setInterval(this.simulateSensorData.bind(this), 5000)
  }

  async loadAllSensors(){
    const sensors = await loadSensors()
    this.setState({sensors: sensors.map(s => ({id: s.sensorId, value: 0}) )})
  }

  async loadPressureThreshold(){
    const pressureThreshold = await fetchPressureThreshold()
    this.setState({pressureThreshold: pressureThreshold})
  }

  onSensorValueChanged = (event) => {
    const sensors = [...this.state.sensors]
    sensors.find(s => s.id === parseInt(event.target.id, 10)).value = event.target.value

    this.setState({ sensors: sensors})
  }

  onSimulationChange = (event) => {
    this.setState({runSimulation: event.target.checked })
  }

  onPressureThresholdChanged = (event) => {
    this.setState({pressureThreshold: event.target.value})
  }

  savePressureThreshold = (event) => {
    sendPressureThreshold(this.state.pressureThreshold)
  }

  async simulateSensorData(){
    if(this.runSimulation){
      this.state.sensors.forEach(sensor => sendSensorData(sensor.id, sensor.value))
    }
  }

  render() {
    return <div>
      <Paper className="sensors">
        <div>
          <TextField label="PressureThreshold" value={this.state.pressureThreshold} onChange={this.onPressureThresholdChanged} />
          <Button onClick={this.savePressureThreshold}>Save</Button>
        </div>
        <div>
          <FormControlLabel control={
            <Switch value={this.state.simulate} onChange={this.onSimulationChange} />
            } label="Simulate sensor data">
          </FormControlLabel>
        </div>
        <div>
          {
          this.state.sensors.map( (sensor) => 
          <SimulatedSensor id={sensor.id} disabled={!this.state.runSimulation} onSensorValueChanged={this.onSensorValueChanged} /> )
          }
        </div>
      </Paper>
    </div>
    }
}

export default Cockpit;
