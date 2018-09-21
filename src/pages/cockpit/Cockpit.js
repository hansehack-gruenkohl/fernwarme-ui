import React from 'react';
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { withStyles } from '@material-ui/core/styles';

import SimulatedSensor from './components/SimulatedSensor';
import {sendSensorData, loadSensors, fetchPressureThreshold, sendPressureThreshold} from '../../services/SensorClient';


const styles = theme => ({
  simulate: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  pressureThreshold: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },

  cockpit: {
    marginTop: '100px',
    marginLeft: '100px',
    marginRight: '100px'
  }
});

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
    this.setState({sensors: sensors.map(s => ({id: s.sensorId, value: 0,name: s.name}) )})
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
    if(this.state.runSimulation){
      this.state.sensors.forEach(sensor => sendSensorData(sensor.id, sensor.value))
    }
  }

  render() {
    const { classes } = this.props;

    return <div>
      <Paper className={classes.cockpit}>
        <Typography variant="headline" component="h3">
          Remote heating grid control
        </Typography>
        <div>
          <TextField className={classes.pressureThreshold} label="PressureThreshold" value={this.state.pressureThreshold} onChange={this.onPressureThresholdChanged} />
          <Button onClick={this.savePressureThreshold}>Save</Button>
        </div>
        <div>
          <FormControlLabel control={
            <Switch className={classes.simulate} value={this.state.simulate} onChange={this.onSimulationChange} />
            } label="Simulate sensor data">
          </FormControlLabel>
        </div>
        <div>
          {
          this.state.sensors.map( (sensor) => 
          <SimulatedSensor id={sensor.id} name={sensor.name} disabled={!this.state.runSimulation} onSensorValueChanged={this.onSensorValueChanged} /> )
          }
        </div>
      </Paper>
    </div>
    }
}

export default withStyles(styles)(Cockpit);
