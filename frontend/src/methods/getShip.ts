export const getShip = async (imo: string) => {
    // const response = await fetch(`http://iceroute.ru/api/index.php?mod=gant&imo=${imo}`)
    const response = await fetch(`http://localhost:4000/api/index.php?mod=gant&imo=${imo}`)
    if(response.ok){
        const shipTrips = await response.json()
        return shipTrips
    }
    console.error('getStartups error', response)
}
