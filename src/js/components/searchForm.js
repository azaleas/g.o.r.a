import { getMoviesDataByTitle } from './../utils/remoteService'

import { store } from './../store'

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
    }
}

store.subscribe(function GET_SEARCH_RESULTS() {
    const searchFormElement = document.querySelector('#searchForm')
    searchFormElement.classList.remove('center--vertical')
})

const SearchForm = () => {
    setTimeout(() => {
        document
            .querySelector('#searchForm')
            .addEventListener('submit', actions.onSearchSubmit)
    }, 0)
    return `
        <form id="searchForm" class="form center--vertical full-width">
            <input name="search-input" class="form-input" type="text" placeholder="Search..."/>
            <button type="submit" class="form-submit-btn">
                <i class="icon-search"></i>
            </button>
        </form>
    `
}

export default SearchForm
