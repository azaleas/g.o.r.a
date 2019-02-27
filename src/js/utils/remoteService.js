import axios from 'axios'
import { OMDB_DATA_REQUEST_URL, PICSUM_URL } from './constants'

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

export function getMovieImages(imdbId = '') {
    return new Promise((resolve, reject) => {
        resolve([
            'https://www.fillmurray.com/g/200/300',
            'https://www.placecage.com/200/500',
            'https://www.fillmurray.com/600/400',
            'https://www.placecage.com/250/400',
            'https://www.fillmurray.com/g/200/400',
            'https://www.placecage.com/g/400/500',
            'https://www.fillmurray.com/300/400',
            'https://www.placecage.com/300/500',
            'https://www.fillmurray.com/g/200/500',
            'https://www.placecage.com/200/600',
            'https://www.fillmurray.com/300/400',
            'https://www.placecage.com/g/600/300',
            'https://www.fillmurray.com/400/500',
            'https://www.placecage.com/g/800/300',
            'https://www.fillmurray.com/250/300',
            'https://www.placecage.com/g/200/500'
        ])
    })
}
