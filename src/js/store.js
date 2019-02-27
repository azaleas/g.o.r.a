const createStore = (reducer, initialState) => {
    const store = {}
    store.state = initialState
    store.listeners = []

    store.getState = () => store.state

    store.subscribe = listener => store.listeners.push(listener)

    store.dispatch = action => {
        store.state = reducer(store.state, action)
        store.listeners.forEach(listener => listener())
    }

    return store
}

const getInitialState = () => {
    return {
        movies: []
    }
}

const reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'ADD_SEARCH_RESULTS':
            const nextState = {
                searchResults: action.payload
            }
            return nextState
        default:
            return state
    }
}

export const store = createStore(reducer)
