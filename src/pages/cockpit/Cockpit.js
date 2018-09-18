import React from 'react';
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import SimulatedSensor from './components/SimulatedSensor';
import {sendSensorData, loadSensors} from '../../services/SensorClient';

import styles from './Cockpit.css'

class Cockpit extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      sensors: [],
      runSimulation: false
    } 
    this.onSensorValueChanged.bind(this)
  }

  componentDidMount() {
    this.loadAllSensors()
    this.intervalJob = setInterval(this.simulateSensorData.bind(this), 5000)
  }

  async loadAllSensors(){
    const sensors = await loadSensors()
    this.setState({sensors: sensors.map(s => ({id: s.sensorId, value: 0}) )})
  }

  onSensorValueChanged = (event) => {
    const sensors = [...this.state.sensors]
    sensors.find(s => s.id === parseInt(event.target.id)).value = event.target.value

    this.setState({ sensors: sensors})
  }

  onSimulationChange = (event) => {
    this.setState({runSimulation: event.target.checked })
  }

  async simulateSensorData(){
    this.state.sensors.forEach(sensor => sendSensorData(sensor.id, sensor.value))
  }

  render() {
    return <div>
      <div className="sensors">
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
      </div>
    </div>
    }
}

export default Cockpit;
