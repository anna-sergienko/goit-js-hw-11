import axios from "axios";

export default class ApiImages{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async getImagesByName() {
        const BASIC_URL = "https://pixabay.com";
        const getAPI = await axios.get(`${BASIC_URL}/api/?key=24818943-fc1e8b370362890e8f757968f&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)

        this.plusPage();
        
        return getAPI;
    }

    startPage() {
        this.page = 1;
    }

    plusPage() {
        this.page += 1;
    }

    minusPage() {
        this.page -= 1;
    }

}