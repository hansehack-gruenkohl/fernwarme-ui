import React from 'react';

import {loadBadSpot, loadUndersuppliedSpots, fetchPressureThreshold} from './services/SensorClient';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';

export default class InfoBox extends React.Component {

  state = {
    badSpot: null,
    undersuppliedSpots: null
  }

  componentDidMount() {
    this.load()
    this.intervalJob = setInterval(this.load.bind(this), 1000)
  }

  async load(){
    const badSpot = await loadBadSpot()
    const undersuppliedSpots = await loadUndersuppliedSpots()
    const pressureThreshold = await fetchPressureThreshold()

    this.setState({badSpot: badSpot, undersuppliedSpots: undersuppliedSpots, pressureThreshold: pressureThreshold})
  }

  render(){
    if(this.state.badSpot){
      const threshold = 'Min Pressure ' + this.state.pressureThreshold
      const badSpotPressure = 'Bad spot ' + this.state.badSpot.value + ' mBar'

      return <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Chip label={threshold} style={{ margin: '10px'}} />
        <Chip label={badSpotPressure} style={{ margin: '10px'}} />
        <IconButton color="inherit">
          <Badge badgeContent={this.state.undersuppliedSpots.sensors.length } color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </div>
      }

return null
}

}
