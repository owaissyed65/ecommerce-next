import { STRAPI_API_TOKEN, API_URL } from './url'
const fetchDataFromApi = async (endpoint) => {
    try {
        const options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + STRAPI_API_TOKEN,
            },
        };

        const res = await fetch(`${API_URL}${endpoint}`, options);
        const data = await res.json();

        return data;
    }
    catch (error) {
        let data = []
        return data
    }
};
export default fetchDataFromApi