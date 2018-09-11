const baseUrl = process.env.REACT_APP_BASE_URL

export async function loadSensors() {
    const rawResponse = await fetch(`${baseUrl}/sensors`)
    return await rawResponse.json()
}

export async function loadBadSpot() {
    const rawResponse = await fetch(`${baseUrl}/badspot`)
    return await rawResponse.json()
}

