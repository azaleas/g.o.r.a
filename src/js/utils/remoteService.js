import axios from 'axios'
import { OMDB_DATA_REQUEST_URL } from './constants'

export function getMovieDataByTitle(searchValue) {
    return axios.get(OMDB_DATA_REQUEST_URL, {
        params: {
            s: searchValue,
            page: 1
        }
    })
}
