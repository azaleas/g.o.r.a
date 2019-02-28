const createStore = (reducer, initialState) => {
    const store = {}
    store.state = initialState
    store.listeners = []

    store.getState = () => store.state

    store.subscribe = listener => store.listeners.push(listener)

    store.dispatch = action => {
        store.state = reducer(store.state, action)
        store.listeners.forEach(listener => {
            if (listener.name === action.type) {
                listener()
            }
        })
    }

    return store
}

const getInitialState = () => {
    return {
        searchResults: [],
        movie: {},
        movieImages: [],
        castImages: []
    }
}

const reducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case 'GET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.payload
            }
        case 'GET_MOVIE_ITEM':
            return {
                ...state,
                movie: action.payload
            }
        case 'GET_MOVIE_IMAGES':
            return {
                ...state,
                movieImages: action.payload
            }
        case 'GET_CAST_IMAGES':
            return {
                ...state,
                castImages: action.payload
            }
        default:
            return state
    }
}

export const store = createStore(reducer)
