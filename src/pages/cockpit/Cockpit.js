import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import SimulatedSensor from './components/SimulatedSensor';
import {sendSensorData} from '../../services/SensorClient';

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

  componentDidMount() {
    this.intervalJob = setInterval(this.simulateSensorData.bind(this), 5000)
  }

  simulateSensorData(){

  }

  render() {
    return <div>
      <Typography variant="subheading" gutterBottom>
        Pressure simulation
      </Typography>
      <Grid container spacing={16} justify="center">
        <Grid item xs={2}>
          <SimulatedSensor sensorId="16"/>
        </Grid>

        <Grid item xs={2}>
          <SimulatedSensor sensorId="40"/>
        </Grid>
       
        <Grid item xs={2}>
          <SimulatedSensor sensorId="56"/>
        </Grid>
      </Grid>
    </div>
  }

}

export default withStyles(styles)(Cockpit);
