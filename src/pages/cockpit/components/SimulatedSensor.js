import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  sensor: { 
    width: 500, 
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },

  simulate: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class SimulatedSensor extends React.Component {

  constructor(props){
    super(props)

    this.state = { id: props.id, name: this.props.name, value : 0}
  }

  onValueChange = (event) => {
    this.setState({
      id: this.state.id,
      value: event.target.value
    })

    this.props.onSensorValueChanged(event)
  }

  render() {
    const { classes } = this.props;

    return <div>
      <FormControl>
        <TextField label={this.state.name} 
          className={classes.sensor} 
          id={this.state.id.toString()} 
          value={this.state.value} 
          disabled={this.props.disabled} 
          onChange={this.onValueChange} />
      </FormControl>
    </div>
  }
}

export default withStyles(styles)(SimulatedSensor);
