import './../style/index.scss'
import { getMovieDataByTitle } from './utils/remoteService'

import { store } from './store'

import searchForm from './components/searchForm'
import moviesList from './components/moviesList'

const actions = {
    onSearchSubmit(e) {
        e.preventDefault()
        const inputValue = e.target.querySelector('[name=search-input]').value

        if (inputValue) {
            getMovieDataByTitle(inputValue).then(response => {
                store.dispatch({
                    type: 'ADD_SEARCH_RESULTS',
                    payload: response.data.Search
                })
            })
        }
    }
}

store.subscribe(() => {
    const state = store.getState(),
        searchResults = state.searchResults

    if (searchResults.length > 0) {
        document.querySelector('.movies-list').innerHTML = moviesList({
            moviesList: searchResults
        })
    }
})

const appMarkup = `
    <div class="container">
        ${searchForm({ id: 'searchForm' })}
        <div class="movies-list">
        </div>
    </div>
`

document.querySelector('#app').innerHTML = appMarkup

document
    .querySelector('#searchForm')
    .addEventListener('submit', actions.onSearchSubmit)
