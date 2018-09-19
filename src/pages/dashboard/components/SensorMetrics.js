import React from 'react';
import { Chart } from 'react-google-charts';
import { loadMeasurementsForSensor } from '../../../services/SensorClient';

class SensorMetrics extends React.Component {

  constructor(props){
    super(props)

    this.state = {measurements: []}
  }

  componentWillReceiveProps(){
    this.loadMeasurements()
  }

  async loadMeasurements(){
    if(this.props.sensor){
      const measurements = await loadMeasurementsForSensor(this.props.sensor.sensorId)

      this.setState({measurements: measurements})
    }
  }

  render(){
    if(!this.props.sensor){
      return null
    }
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...this.props.style}}>
        <h2 style={{ margin: '50px 20px', textAlign: 'center' }}>{this.props.sensor.name}</h2>
        <Chart chartType="Gauge"
          data={[
          ["mBar"],
          this.gaugeData(this.state.measurements)
          ]}
          options={{ redFrom: 0, redTo: 20, greenFrom: 20, greenTo: 100, max: 100 }}
          style={{marginBottom: 20 }} />

        <Chart chartType="AreaChart"
          data={[
          ['Time', 'mBar'],
          ...this.historyData(this.state.measurements)
          ]}
          options={{
          title: 'History',
          vAxis: { title: 'mBar' },
          legend: { position: 'none' }
          }}
          // For tests
          width="100%"
          rootProps={{ 'data-testid': '1' }} />
      </div>
      )
    }

gaugeData(measurements) {
  const lastMeasurement = measurements[0] || {}
  return [
    lastMeasurement.value || 0
  ]
}

historyData(measurements) {
  return measurements.map(m => {
    const date = new Date(m.measuredAt)
    return [date, m.value || 0]
  })
}
}


export default SensorMetrics
