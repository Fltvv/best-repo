//@ts-ignore
export const sendNewForm = async (data) => {
    const respCreate = await fetch('https://iceroute.ru/php/catalog/create.php')
    let presId
    if(respCreate.ok){
        presId = await respCreate.json()
    }
}
