import MovieOverviewContent from './MovieOverviewContent'
import CastDetailsContent from './CastDetailsContent'

import Tabs from './Tabs'

const MovieItem = ({ movie }) => {
    const navbarInfoBlock = `
    <div class="movie-short-information">
        <p class="movie-short-information__title">${movie.Title}</p>
        <p class="movie-short-information__general-information">
            <span class="movie-short-information__release-year">${
                movie.Year
            }</span> ·
            <span class="movie-short-information__genre">${movie.Genre}</span> ·
            <span class="movie-short-information__runtime">${
                movie.Runtime
            }</span>
        </p>
    </div>
    `

    const navBarDropDownMenuElements = [
        '<i class="icon-share"></i><span>Share</span>',
        '<i class="icon-claim"></i><span>Claim this knowledge panel</span>',
        '<i class="icon-feedback"></i><span>Send feedback</span>'
    ]

    const navbarTabContent = {
        left: {
            name: 'OVERVIEW',
            content: MovieOverviewContent({ movie })
        },
        right: {
            name: 'CAST DETAILS',
            content: CastDetailsContent({ movie })
        }
    }

    return Tabs({
        navbarInfoBlock,
        navBarDropDownMenuElements,
        navbarTabContent
    })
}

export default MovieItem
