const baseUrl = 'http://10.250.252.68:8080'

export async function loadSensorsWithMeasurements() {
    const sensors = await loadSensors()

    const sensorByIdMap = {}
    sensors.forEach(s => {
        sensorByIdMap[s.sensorId] = s
        s.measurements = []
    })

    const measurements = await loadMeasurements()
    
    measurements.forEach(m => {
        const sensor = sensorByIdMap[m.sensorId]
        sensor.measurements.push(m)
    })

    return sensors
}

async function loadSensors() {
    const rawResponse = await fetch(`${baseUrl}/sensors`)
    const response = await rawResponse.json()
    return response._embedded.sensors
}

async function loadMeasurements() {
    const sensorDatasResponse = await fetch(`${baseUrl}/sensorDatas/?size=1000&sort=measuredAt,desc`)
    const sensorDatas = await sensorDatasResponse.json()
    return sensorDatas._embedded.sensorDatas
}