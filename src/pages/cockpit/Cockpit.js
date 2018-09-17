import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import SimulatedSensor from './components/SimulatedSensor';
import {sendSensorData, loadSensors} from '../../services/SensorClient';

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Cockpit extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      sensors: [] 
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

  async simulateSensorData(){
    this.state.sensors.forEach(sensor => sendSensorData(sensor.id, sensor.value))
  }

  render() {
    return <div>
      <Typography variant="subheading" gutterBottom>
        Pressure simulation
      </Typography>
      <Grid container spacing={16} justify="center">
        {
        this.state.sensors.map( (sensor) => 
        <Grid key={sensor.id} item xs={2}> <SimulatedSensor id={sensor.id} onSensorValueChanged={this.onSensorValueChanged} /> </Grid> )
        }
      </Grid>
    </div>
    }
}

export default withStyles(styles)(Cockpit);
