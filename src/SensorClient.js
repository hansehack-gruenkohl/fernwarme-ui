const baseUrl = 'http://10.250.252.68:8080'

export async function getSensors() {
    const sensorsResponse = await fetch(`${baseUrl}/sensors`)
    const sensors = await sensorsResponse.json()

    const sensorByIdMap = {}
    sensors.forEach(s => {
        sensorByIdMap[s.sensorId] = s
        s.measurements = []
    })

    const sensorDatasResponse = await fetch(`${baseUrl}/sensorDatas/?size=1000&sort=measuredAt,desc`)
    const sensorDatas = await sensorDatasResponse.json()

    const measurements = sensorDatas._embedded.sensorDatas
    measurements.forEach(m => {
        const sensor = sensorByIdMap[m.sensorId]
        sensor.measurements.push(m)
    })

    return sensors
}
