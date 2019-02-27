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
    onSearchSubmit(e) {
        e.preventDefault()
        const inputValue = e.target.querySelector('[name=search-input]').value

        if (inputValue) {
            getMoviesDataByTitle(inputValue).then(response => {
                store.dispatch({
                    type: 'GET_SEARCH_RESULTS',
                    payload: response.data.Search
                })
            })
        }
    },

    onGetMovie(e) {
        const movieListItem = e.target.closest('.movies-list__item'),
            { imdbId } = movieListItem.dataset

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
        movieItemElement.classList.remove('movie-item--shown')
        movieItemElement.classList.add('movie-item--hidden')
        moviesListElement.classList.remove('movies-list--hidden')
        moviesListElement.classList.add('movies-list--shown')
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
        moviesListElement.classList.remove('movies-list--shown')
        moviesListElement.classList.add('movies-list--hidden')
        movieItemElement.classList.remove('movie-item--hidden')
        movieItemElement.classList.add('movie-item--shown')
    }
})

const appMarkup = `
    <div class="container">
        ${SearchForm({ id: 'searchForm' })}
        <div id="moviesList" class="movies-list">
        </div>
        <div id="movieItem" class="movie-item">
        </div>
    </div>
`

document.querySelector('#app').innerHTML = appMarkup

document
    .querySelector('#searchForm')
    .addEventListener('submit', actions.onSearchSubmit)

document
    .querySelector('#moviesList')
    .addEventListener('click', actions.onGetMovie)
