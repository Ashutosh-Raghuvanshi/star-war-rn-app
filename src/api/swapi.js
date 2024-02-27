import axios from "axios";

export const getPeople = (url) => {
    return axios.get(url)
        .then(res => res.data);
}
