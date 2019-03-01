import axios from 'axios'
import {
    OMDB_DATA_REQUEST_URL,
    MOVIE_IMAGES_LIST,
    CAST_NAMES,
    CAST_ROLES
} from './constants'

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
        resolve(MOVIE_IMAGES_LIST)
    })
}

export function getCastImages(actors = '') {
    return new Promise((resolve, reject) => {
        let castImages = []
        for (let i = 0; i < 25; i++) {
            const castImage = {
                actorImage: `//robohash.org/${i}`,
                actorName: CAST_NAMES[i],
                actorPlayedRole: CAST_ROLES[i]
            }
            castImages.push(castImage)
        }
        if (actors.length > 0 && actors !== 'N/A') {
            actors
                .split(', ')
                .forEach(
                    (actor, index) => (castImages[index].actorName = actor)
                )
        }
        resolve(castImages)
    })
}
