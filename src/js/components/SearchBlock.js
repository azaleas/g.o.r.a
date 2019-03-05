import { APP_NAME } from './../utils/constants'

import { store } from './../store'

import SearchForm from './SearchForm'
import LoadingIndicator from './LoadingIndicator'
import ErrorBlock from './ErrorBlock'

const properties = {
    id: 'searchBlock'
}

const actions = {}

store.subscribe(function GET_SEARCH_RESULTS() {
    const searchBlockElement = document.getElementById(properties.id)
    searchBlockElement.classList.remove('center--vertical')
})

const SearchBlock = () => {
    return `
        <div class="center--vertical full-width search-block mar-hor--auto" id="${
            properties.id
        }">
            <h1 class="appName text-center">
                ${APP_NAME.split('')
                    .map(el => `<span>${el}</span>`)
                    .join('')}
            </h1>
            ${SearchForm()}
            ${LoadingIndicator()}
            ${ErrorBlock()}
        </div>
    `
}

export default SearchBlock
