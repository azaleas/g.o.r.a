import MovieOverviewContent from './MovieOverviewContent'
import CastDetailsContent from './CastDetailsContent'

import Tabs from './Tabs'

import { store } from './../store'

const properties = {
    id: 'movieItem'
}

store.subscribe(function GET_MOVIE_ITEM() {
    const state = store.getState(),
        { movie } = state,
        routeElement = document.getElementById(properties.id)

    if (Object.keys(movie).length > 0) {
        routeElement.innerHTML = MovieItem({
            movie
        })
    }
})

const MovieItem = ({ movie = {} } = {}) => {
    let navbarInfoBlock = null,
        navBarDropDownMenuElements = null,
        navbarTabContent = null

    if (Object.keys(movie).length > 0) {
        navbarInfoBlock = `
            <div class="movie-short-information">
                <p class="movie-short-information__title">${movie.Title}</p>
                <p class="movie-short-information__general-information">
                    <span class="movie-short-information__release-year">${
                        movie.Year
                    }</span> ·
                    <span class="movie-short-information__genre">${
                        movie.Genre
                    }</span> ·
                    <span class="movie-short-information__runtime">${
                        movie.Runtime
                    }</span>
                </p>
            </div>
        `

        navBarDropDownMenuElements = [
            '<i class="icon-share"></i><span>Share</span>',
            '<i class="icon-claim"></i><span>Claim this knowledge panel</span>',
            '<i class="icon-feedback"></i><span>Send feedback</span>'
        ]

        navbarTabContent = {
            left: {
                name: 'OVERVIEW',
                content: MovieOverviewContent({ movie })
            },
            right: {
                name: 'CAST DETAILS',
                content: CastDetailsContent({ movie })
            }
        }
    }

    return `
        <div id="${properties.id}" class="movie-item js-route-component">
            ${
                Object.keys(movie).length
                    ? Tabs({
                          navbarInfoBlock,
                          navBarDropDownMenuElements,
                          navbarTabContent
                      })
                    : ``
            }
        </div>
    `
}

export default MovieItem
