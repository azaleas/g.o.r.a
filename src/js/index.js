import './../style/index.scss'
import { APP_NAME } from './utils/constants'
import { getMovieDataByImdbId } from './utils/remoteService'
import { scrollToTop } from './utils/helperFunctions'

import { store } from './store'

import SearchForm from './components/SearchForm'
import MoviesList from './components/MoviesList'
import MovieItem from './components/MovieItem'

const actions = {
    onGetMovie(e) {
        const movieListItem = e.target.closest('.movies-list__item'),
            imdbId = movieListItem && movieListItem.dataset.imdbId

        if (imdbId) {
            store.dispatch({
                type: 'DATA_LOADING'
            })
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
        { searchResults, errorMessage } = state,
        routeElement = document.querySelector('#moviesList'),
        routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        ),
        loadingIndicatorElement = document.querySelector('#loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (errorMessage.length === 0) {
        const errorElement = document.querySelector('#error')
        errorElement.innerHTML = ''
    }

    if (searchResults.length > 0) {
        routeElement.innerHTML = MoviesList({
            moviesList: searchResults
        })

        routeComonentElements.forEach(item =>
            item.id !== routeElement.id
                ? item.classList.add('hidden')
                : item.classList.remove('hidden')
        )

        scrollToTop()
    }
})

store.subscribe(function GET_MOVIE_ITEM() {
    const state = store.getState(),
        { movie, errorMessage } = state,
        routeElement = document.querySelector('#movieItem'),
        routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        ),
        loadingIndicatorElement = document.querySelector('#loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (Object.keys(movie).length > 0) {
        routeElement.innerHTML = MovieItem({
            movie
        })

        routeComonentElements.forEach(item =>
            item.id !== routeElement.id
                ? item.classList.add('hidden')
                : item.classList.remove('hidden')
        )

        scrollToTop()
    }

    if (errorMessage.length === 0) {
        const errorElement = document.querySelector('#error')
        errorElement.innerHTML = ''
    }
})

store.subscribe(function GET_CAST_MEMBER() {
    const state = store.getState(),
        { actorInfo, errorMessage } = state,
        routeElement = document.querySelector('#castItem'),
        routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        ),
        loadingIndicatorElement = document.querySelector('#loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (Object.keys(actorInfo).length > 0) {
        routeElement.innerHTML = MovieItem({
            actorInfo
        })

        routeComonentElements.forEach(item =>
            item.id !== routeElement.id
                ? item.classList.add('hidden')
                : item.classList.remove('hidden')
        )

        scrollToTop()
    }

    if (errorMessage.length === 0) {
        const errorElement = document.querySelector('#error')
        errorElement.innerHTML = ''
    }
})

store.subscribe(function ERROR() {
    const state = store.getState(),
        { errorMessage } = state,
        errorElement = document.querySelector('#error'),
        loadingIndicatorElement = document.querySelector('#loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (errorMessage.length > 0) {
        errorElement.innerHTML = `<p>${errorMessage}</p>`
    }
})

store.subscribe(function GET_SEARCH_RESULTS() {
    const searchBlockElement = document.querySelector('#searchBlock')
    searchBlockElement.classList.remove('center--vertical')
})

store.subscribe(function DATA_LOADING() {
    const loadingIndicatorElement = document.querySelector('#loadingIndicator')
    loadingIndicatorElement.classList.add('loading-indicator--enabled')
})

const appMarkup = `
    <div class="container container--full-height js-container">
        <div class="center--vertical full-width search-block mar-hor--auto" id="searchBlock">
            <h1 class="appName text-center">
                ${APP_NAME.split('')
                    .map(el => `<span>${el}</span>`)
                    .join('')}
            </h1>
            ${SearchForm()}
            <div id="loadingIndicator" class="loading-indicator">
            </div>
            <div id="error" class="error text-center mar-hor--auto">
            </div>
        </div>
        <div id="moviesList" class="movies-list js-route-component">
        </div>
        <div id="movieItem" class="movie-item js-route-component">
        </div>
        <div id="castItem" class="cast-item js-route-component">
        </div>
    </div>
`

document.querySelector('#app').innerHTML = appMarkup

document
    .querySelector('#moviesList')
    .addEventListener('click', actions.onGetMovie)
