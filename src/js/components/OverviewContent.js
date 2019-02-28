import { getMovieImages } from './../utils/remoteService'
import { store } from './../store'

const actions = {
    loadMovieImage() {
        getMovieImages().then(response => {
            store.dispatch({
                type: 'GET_MOVIE_IMAGES',
                payload: response
            })
        })
    },

    handleViewAllImages() {
        alert('One day...')
    }
}

store.subscribe(function GET_MOVIE_IMAGES() {
    const state = store.getState(),
        { movieImages, movie } = state,
        movieImagesCarouselElement = document.querySelector(
            '#movieImagesCarousel'
        )

    if (movieImages.length > 0) {
        movieImagesCarouselElement.innerHTML = `
            ${
                movie.Poster !== 'N/A'
                    ? `<div class="movie-images-carousel__item">
                            <img src="${movie.Poster}" alt="Movie Poster"/>
                        </div>`
                    : ``
            }
            ${movieImages
                .map(
                    element =>
                        `
                        <div class="movie-images-carousel__item">
                            <img src="${element}" alt="Movie Images"/>
                        </div>
                    `
                )
                .join('')}
            <div class="movie-images-carousel__item">
                <div class="view-all-images__wrapper cur-pointer" onclick="alert('One day...')">
                    <i class="icon-right-arrow view-all-images__icon"></i>
                    <p class="view-all-images__text">View all</p>
                </div>
            </div>
        `
    }
})

const OverviewContent = ({ movie }) => {
    setTimeout(() => {
        actions.loadMovieImage()
    }, 0)

    return `
        <div class="movie-images-carousel" id="movieImagesCarousel">

        </div>
        <div class="movie-more-information-card">
            <div class="movie-ratings">
                ${movie.Ratings.map(rating => {
                    return `
                        <div class="movie-ratings-item">
                            <p class="movie-rating__score">${rating.Value}</p>
                            <p class="movie-rating__source">${
                                rating.Source === 'Internet Movie Database'
                                    ? 'IMDb'
                                    : rating.Source
                            }</p>
                        </div>
                    `
                }).join('')}
            </div>
            <div class="movie-votes">
                <div class="movie-votes-information">
                    <p class="movie-votes__count">${
                        movie.imdbVotes
                    } people voted for this film</p>
                    <p class="movie-votes__source">IMDb</p>
                </div>
                <div class="movie-votes-vote-btn-group">
                    <input type="button" value="Up"/>
                    <input type="button" value="Down"/>
                </div>
            </div>
            <div class="movie-more-information">
                <p class="movie-more-information__movie-plot">
                    ${movie.Plot}
                </p>
                <p class="movie-more-information__movie-director">
                    Director: <span>${movie.Director}</span>
                </p>
                <p class="movie-more-information__movie-release-information">Release date: <span class="movie-more-information__release-year">${
                    movie.Released
                }</span> <span>(${movie.Country})</span></p>
                <p class="movie-more-information__movie-screenplay">
                    Story by: ${movie.Writer}
                </p>
                <p class="movie-more-information__movie-awards">
                    Awards & Nominations: ${movie.Awards}
                </p>
            </div>
        </div>
    `
}

export default OverviewContent
