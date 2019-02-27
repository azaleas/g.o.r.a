import axios from 'axios'
import { OMDB_DATA_REQUEST_URL } from './constants'

export function getMoviesDataByTitle(searchValue) {
    return axios.get(OMDB_DATA_REQUEST_URL, {
        params: {
            s: searchValue,
            page: 1
        }
    })
}

export function getMovieDataByImdbId(imdbId) {
    return axios.get(OMDB_DATA_REQUEST_URL, {
        params: {
            i: imdbId,
            plot: 'full'
        }
    })
}
