import './../style/index.scss'
import { scrollToTop } from './utils/helperFunctions'

import { store } from './store'

import MoviesList from './components/MoviesList'
import MovieItem from './components/MovieItem'
import CastItem from './components/CastItem'

import SearchBlock from './components/SearchBlock'

const actions = {
    changeRoute({ routeElement, routeComonentElements }) {
        routeComonentElements.forEach(item => {
            if (item.id !== routeElement.id) {
                item.classList.add('hidden')
                item.innerHTML = ''
            }
            item.classList.remove('hidden')
        })

        scrollToTop()
    }
}

store.subscribe(function GET_SEARCH_RESULTS() {
    const state = store.getState(),
        { searchResults } = state,
        routeElement = document.getElementById('moviesList'),
        routeComonentElements = document.querySelectorAll('.js-route-component')

    if (searchResults.length > 0) {
        actions.changeRoute({ routeElement, routeComonentElements })
    }
})

store.subscribe(function GET_MOVIE_ITEM() {
    const state = store.getState(),
        { movie } = state,
        routeElement = document.getElementById('movieItem'),
        routeComonentElements = document.querySelectorAll('.js-route-component')

    if (Object.keys(movie).length > 0) {
        actions.changeRoute({ routeElement, routeComonentElements })
    }
})

store.subscribe(function GET_CAST_MEMBER() {
    const state = store.getState(),
        { actorInfo } = state,
        routeElement = document.getElementById('castItem'),
        routeComonentElements = document.querySelectorAll('.js-route-component')

    if (Object.keys(actorInfo).length > 0) {
        actions.changeRoute({ routeElement, routeComonentElements })
    }
})

const appMarkup = `
    <div class="container container--full-height js-container">
        ${SearchBlock()}
        ${MoviesList()}
        ${MovieItem()}
        ${CastItem()}
    </div>
`

document.getElementById('app').innerHTML = appMarkup
