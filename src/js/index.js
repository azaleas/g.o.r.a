import './../style/index.scss'
import {
    getMoviesDataByTitle,
    getMovieDataByImdbId
} from './utils/remoteService'

import { store } from './store'

import SearchForm from './components/SearchForm'
import MoviesList from './components/MoviesList'
import MovieItem from './components/MovieItem'

const actions = {
    onGetMovie(e) {
        const movieListItem = e.target.closest('.movies-list__item'),
            imdbId = movieListItem && movieListItem.dataset.imdbId

        if (imdbId) {
            getMovieDataByImdbId(imdbId).then(response => {
                store.dispatch({
                    type: 'GET_MOVIE_ITEM',
                    payload: response.data
                })
            })
        }
    }
}

store.subscribe(function GET_SEARCH_RESULTS() {
    const state = store.getState(),
        { searchResults } = state,
        moviesListElement = document.querySelector('#moviesList'),
        movieItemElement = document.querySelector('#movieItem')

    if (searchResults.length > 0) {
        moviesListElement.innerHTML = MoviesList({
            moviesList: searchResults
        })
        movieItemElement.classList.remove('shown')
        movieItemElement.classList.add('hidden')
        moviesListElement.classList.remove('hidden')
        moviesListElement.classList.add('shown')
    }
})

store.subscribe(function GET_MOVIE_ITEM() {
    const state = store.getState(),
        { movie } = state,
        moviesListElement = document.querySelector('#moviesList'),
        movieItemElement = document.querySelector('#movieItem')

    if (Object.keys(movie).length > 0) {
        movieItemElement.innerHTML = MovieItem({
            movie
        })
        moviesListElement.classList.remove('shown')
        moviesListElement.classList.add('hidden')
        movieItemElement.classList.remove('hidden')
        movieItemElement.classList.add('shown')
    }
})

const appMarkup = `
    <div class="container container--full-height">
        ${SearchForm()}
        <div id="moviesList" class="movies-list">
        </div>
        <div id="movieItem" class="movie-item">
        </div>
    </div>
`

document.querySelector('#app').innerHTML = appMarkup

document
    .querySelector('#moviesList')
    .addEventListener('click', actions.onGetMovie)
