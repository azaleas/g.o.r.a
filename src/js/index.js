import './../style/index.scss'
import { APP_NAME } from './utils/constants'
import { scrollToTop } from './utils/helperFunctions'

import { store } from './store'

import SearchForm from './components/SearchForm'
import MoviesList from './components/MoviesList'
import MovieItem from './components/MovieItem'
import CastItem from './components/CastItem'

store.subscribe(function GET_SEARCH_RESULTS() {
    const state = store.getState(),
        { searchResults, errorMessage } = state,
        routeElement = document.getElementById('moviesList'),
        routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        ),
        loadingIndicatorElement = document.getElementById('loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (errorMessage.length === 0) {
        const errorElement = document.getElementById('error')
        errorElement.innerHTML = ''
    }

    if (searchResults.length > 0) {
        routeComonentElements.forEach(item => {
            if (item.id !== routeElement.id) {
                item.classList.add('hidden')
                item.innerHTML = ''
            }
            item.classList.remove('hidden')
        })

        scrollToTop()
    }
})

store.subscribe(function GET_MOVIE_ITEM() {
    const state = store.getState(),
        { movie, errorMessage } = state,
        routeElement = document.getElementById('movieItem'),
        routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        ),
        loadingIndicatorElement = document.getElementById('loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (Object.keys(movie).length > 0) {
        routeComonentElements.forEach(item => {
            if (item.id !== routeElement.id) {
                item.classList.add('hidden')
                item.innerHTML = ''
            }
            item.classList.remove('hidden')
        })

        scrollToTop()
    }

    if (errorMessage.length === 0) {
        const errorElement = document.getElementById('error')
        errorElement.innerHTML = ''
    }
})

store.subscribe(function GET_CAST_MEMBER() {
    const state = store.getState(),
        { actorInfo, errorMessage } = state,
        routeElement = document.getElementById('castItem'),
        routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        ),
        loadingIndicatorElement = document.getElementById('loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (Object.keys(actorInfo).length > 0) {
        routeComonentElements.forEach(item => {
            if (item.id !== routeElement.id) {
                item.classList.add('hidden')
                item.innerHTML = ''
            }
            item.classList.remove('hidden')
        })

        scrollToTop()
    }

    if (errorMessage.length === 0) {
        const errorElement = document.getElementById('error')
        errorElement.innerHTML = ''
    }
})

store.subscribe(function ERROR() {
    const state = store.getState(),
        { errorMessage } = state,
        errorElement = document.getElementById('error'),
        loadingIndicatorElement = document.getElementById('loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (errorMessage.length > 0) {
        errorElement.innerHTML = `<p>${errorMessage}</p>`
    }
})

store.subscribe(function GET_SEARCH_RESULTS() {
    const state = store.getState(),
        { searchResults, errorMessage } = state,
        routeElement = document.getElementById('moviesList'),
        routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        ),
        loadingIndicatorElement = document.getElementById('loadingIndicator')

    loadingIndicatorElement.classList.remove('loading-indicator--enabled')

    if (errorMessage.length === 0) {
        const errorElement = document.getElementById('error')
        errorElement.innerHTML = ''
    }

    if (searchResults.length > 0) {
        routeComonentElements.forEach(item => {
            if (item.id !== routeElement.id) {
                item.classList.add('hidden')
                item.innerHTML = ''
            }
            item.classList.remove('hidden')
        })
        scrollToTop()
    }
    const searchBlockElement = document.getElementById('searchBlock')
    searchBlockElement.classList.remove('center--vertical')
})

store.subscribe(function DATA_LOADING() {
    const loadingIndicatorElement = document.getElementById('loadingIndicator')
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
        ${MoviesList()}
        ${MovieItem()}
        ${CastItem()}
    </div>
`

document.getElementById('app').innerHTML = appMarkup
