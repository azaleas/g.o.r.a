import { getMoviesDataByTitle } from './../utils/remoteService'

import { store } from './../store'

const actions = {
    onSearchSubmit(e) {
        e.preventDefault()
        const inputValue = e.target.querySelector('[name=search-input]').value

        if (inputValue) {
            store.dispatch({
                type: 'DATA_LOADING',
                payload: true
            })
            getMoviesDataByTitle(inputValue).then(response => {
                if (response.data.Search) {
                    store.dispatch({
                        type: 'GET_SEARCH_RESULTS',
                        payload: response.data.Search
                    })
                } else {
                    store.dispatch({
                        type: 'ERROR',
                        payload: response.data.Error
                    })
                }
            })
        }
    }
}

const SearchForm = () => {
    setTimeout(() => {
        document
            .getElementById('searchForm')
            .addEventListener('submit', actions.onSearchSubmit)
    }, 0)
    return `
        <form id="searchForm" class="form mar-hor--auto">
            <input name="search-input" class="form-input" type="text" placeholder="Search..."/>
            <button type="submit" class="form-submit-btn">
                <i class="icon-search"></i>
            </button>
        </form>
    `
}

export default SearchForm
