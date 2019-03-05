import { store } from './../store'

const properties = {
    id: 'error'
}

const actions = {}

store.subscribe(function GET_SEARCH_RESULTS() {
    const state = store.getState(),
        { errorMessage } = state

    if (errorMessage.length === 0) {
        const errorElement = document.getElementById(properties.id)
        errorElement.innerHTML = ''
    }
})

store.subscribe(function ERROR() {
    const state = store.getState(),
        { errorMessage } = state,
        errorElement = document.getElementById(properties.id)

    if (errorMessage.length > 0) {
        errorElement.innerHTML = `<p>${errorMessage}</p>`
    }
})

store.subscribe(function GET_CAST_MEMBER() {
    const state = store.getState(),
        { errorMessage } = state

    if (errorMessage.length === 0) {
        const errorElement = document.getElementById('error')
        errorElement.innerHTML = ''
    }
})

store.subscribe(function GET_MOVIE_ITEM() {
    const state = store.getState(),
        { errorMessage } = state

    if (errorMessage.length === 0) {
        const errorElement = document.getElementById('error')
        errorElement.innerHTML = ''
    }
})

const ErrorBlock = () => {
    return `
        <div id="${properties.id}" class="error text-center">
        </div>
    `
}

export default ErrorBlock
