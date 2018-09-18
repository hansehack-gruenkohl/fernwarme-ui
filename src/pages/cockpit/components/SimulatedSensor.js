import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class SimulatedSensor extends React.Component {

  constructor(props){
    super(props)
    this.state = { id: props.id, value : 0}
  }

  onValueChange = (event) => {
    this.setState({
      id: this.state.id,
      value: event.target.value
    })

    this.props.onSensorValueChanged(event)
  }

  render() {
    return <div>
      <FormControl>
        <InputLabel htmlFor="sensor-name">Rathaus Lübeck</InputLabel>
        <Input id={this.state.id.toString()} value={this.state.value} disabled={this.props.disabled} onChange={this.onValueChange} />
      </FormControl>
    </div>
  }
}

export default SimulatedSensor;
