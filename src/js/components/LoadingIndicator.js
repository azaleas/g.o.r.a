import { store } from './../store'

const properties = {
    id: 'loadingIndicator'
}

const actions = {
    disableLoadingIndicator() {
        const loadingIndicatorElement = document.getElementById(properties.id)
        loadingIndicatorElement.classList.remove('loading-indicator--enabled')
    },
    enableLoadingIndicator() {
        const loadingIndicatorElement = document.getElementById(properties.id)
        loadingIndicatorElement.classList.add('loading-indicator--enabled')
    }
}

store.subscribe(function DATA_LOADING() {
    actions.enableLoadingIndicator()
})

store.subscribe(function GET_SEARCH_RESULTS() {
    actions.disableLoadingIndicator()
})

store.subscribe(function ERROR() {
    actions.disableLoadingIndicator()
})

store.subscribe(function GET_CAST_MEMBER() {
    actions.disableLoadingIndicator()
})

store.subscribe(function GET_MOVIE_ITEM() {
    actions.disableLoadingIndicator()
})

const LoadingIndicator = () => {
    return `
        <div id="${properties.id}" class="loading-indicator">
        </div>
    `
}

export default LoadingIndicator
