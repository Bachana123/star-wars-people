const getAllStarWarsPeople = async (payload: {page: number, search?: string }) => {
    const link = `https://swapi.dev/api/people/?page=${payload.page}${payload.search ? `&search=${payload.search}` : ''}`;
    const response = await fetch(link)
    const body = await response.json();
    return body
}

const getStarWarsPerson = async (userId: string) => {
    const link = `https://swapi.dev/api/people/${userId}`;
    const response = await fetch(link)
    const body = await response.json();
    return body
}

const services = {
    getAllStarWarsPeople,
    getStarWarsPerson
}

export default services;