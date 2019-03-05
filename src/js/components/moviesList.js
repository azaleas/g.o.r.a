import { store } from './../store'
import { getMovieDataByImdbId } from './../utils/remoteService'

const properties = {
    id: 'moviesList'
}

const actions = {
    onGetMovie(e) {
        const movieListItem = e.target.closest('.js-movies-list__item'),
            imdbId = movieListItem && movieListItem.dataset.imdbId

        if (imdbId) {
            store.dispatch({
                type: 'DATA_LOADING'
            })
            getMovieDataByImdbId(imdbId).then(response => {
                store.dispatch({
                    type: 'GET_MOVIE_ITEM',
                    payload: response.data
                })
            })
        }
    }
}

store.subscribe(function GET_SEARCH_RESULTS() {
    const state = store.getState(),
        { searchResults } = state,
        routeElement = document.getElementById(properties.id)

    if (searchResults.length > 0) {
        routeElement.outerHTML = MoviesList({
            moviesList: searchResults
        })
    }
})

const MoviesList = ({ moviesList = [] } = {}) => {
    setTimeout(() => {
        document
            .getElementById(properties.id)
            .addEventListener('click', actions.onGetMovie)
    }, 0)

    return `
    <div id="${
        properties.id
    }" class="movies-list route-component js-route-component">
        ${
            moviesList.length > 0
                ? moviesList
                      .map(
                          movie =>
                              `
                <div class="movies-list__item js-movies-list__item cur-pointer" data-imdb-id=${
                    movie.imdbID
                }>
                    <div class="movies-list__image-wrapper" ${
                        movie.Poster !== 'N/A'
                            ? `style="background-image: url(${movie.Poster})`
                            : ''
                    }">
                        ${
                            movie.Poster === 'N/A'
                                ? `<i class="movies-list__image-placeholder-icon icon-image-card"></i>`
                                : ``
                        }
                    </div>
                    <div class="movies-list__information text-center">
                        <p class="movies-list__movie-title">
                            ${movie.Title}
                        </p>
                        <hr/>
                        <p class="movies-list__movie-info">
                            · ${movie.Year} ·
                        </p>
                    </div>
                </div>
            `
                      )
                      .join('')
                : ``
        }
    </div>
    `
}
export default MoviesList
