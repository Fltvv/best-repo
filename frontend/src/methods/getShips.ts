export const getShips = async () => {
    // const response = await fetch('http://iceroute.ru/api/index.php?mod=ships')
    const response = await fetch('http://localhost:4000/api/index.php?mod=ships')
    if(response.ok){
        const ships = await response.json()
        return ships
    }
    console.error('getStartups error', response)
}
