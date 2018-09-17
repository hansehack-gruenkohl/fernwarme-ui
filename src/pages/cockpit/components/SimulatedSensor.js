import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class SimulatedSensor extends React.Component {

  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = { sensorId: props.sensorId, value : 0}
  }

  onChange(event){
    this.setState({value: event.target.value});
  }

  render() {
    return <div>
      <FormControl>
        <InputLabel htmlFor="sensor-name">Rathaus Lübeck</InputLabel>
        <Input id={this.state.id} value={this.state.value} onChange={this.onChange} />
      </FormControl>
    </div>
  }
}

export default SimulatedSensor;
