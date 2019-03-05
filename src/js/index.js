import './../style/index.scss'
import { scrollToTop } from './utils/helperFunctions'

import { store } from './store'

import MoviesList from './components/MoviesList'
import MovieItem from './components/MovieItem'
import CastItem from './components/CastItem'

import SearchBlock from './components/SearchBlock'

const actions = {
    changeRoute({ routeElement }) {
        const routeComonentElements = document.querySelectorAll(
            '.js-route-component'
        )

        routeComonentElements.forEach(item => {
            if (item.id !== routeElement.id) {
                item.classList.add('hidden')
                item.innerHTML = ''
            } else {
                item.classList.remove('hidden')
            }
        })

        scrollToTop()
    }
}

store.subscribe(function GET_SEARCH_RESULTS() {
    const state = store.getState(),
        { searchResults } = state,
        routeElement = document.getElementById('moviesList')

    if (searchResults.length > 0) {
        actions.changeRoute({ routeElement })
    }
})

store.subscribe(function GET_MOVIE_ITEM() {
    const state = store.getState(),
        { movie } = state,
        routeElement = document.getElementById('movieItem')

    if (Object.keys(movie).length > 0) {
        actions.changeRoute({ routeElement })
    }
})

store.subscribe(function GET_CAST_MEMBER() {
    const state = store.getState(),
        { actorInfo } = state,
        routeElement = document.getElementById('castItem')

    if (Object.keys(actorInfo).length > 0) {
        actions.changeRoute({ routeElement })
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
