import axios from 'axios';

let perPage = 12;

const searchImages = async (query, page) => {
    const params = new URLSearchParams({
        key: "35166786-6cff48c73f51fd457f4a9ef76",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: perPage,
    });

    let response = await axios.get(`https://pixabay.com/api/?${params}`);

    if (response.totalHits === 0) {
        alert('ERROR')
    }
    return response;
};

export default searchImages