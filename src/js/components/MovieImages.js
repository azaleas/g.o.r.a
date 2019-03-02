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
                    <i class="icon-right-arrow view-all-images__icon color-blue"></i>
                    <p class="view-all-images__text color-black--transparent">View all</p>
                </div>
            </div>
        `
    }
})

const MovieImages = () => {
    actions.loadMovieImage()
    return `
        <div class="movie-images-carousel" id="movieImagesCarousel">

        </div>
    `
}

export default MovieImages
