export interface Trip {
    "start": string,
    "end": string,
    "name": string,
    "id": string,
    "type": string,
    "color": string,
    "dependencies": string,
    "progress": string,
    "point_begin": string,
    "point_end": string
}

export const getTrips = async () => {
    // const response = await fetch('http://iceroute.ru/api/index.php?mod=gant')
    const response = await fetch('http://localhost:4000/api/index.php?mod=gant')
    if(response.ok){
        const trips: Trip[] = await response.json()
        return trips
    }
    console.error('getStartups error', response)
}
