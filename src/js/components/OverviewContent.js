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
    }
}

store.subscribe(function GET_MOVIE_IMAGES() {
    const state = store.getState(),
        { movieImages } = state,
        movieImagesCarouselElement = document.querySelector(
            '#movieImagesCarousel'
        )

    if (movieImages.length > 0) {
        movieImagesCarouselElement.innerHTML = movieImages
            .map(
                element =>
                    `
                    <div class="movie-images-carousel__item">
                        <img src="${element}" alt="Movie Images"/>
                    </div>
                `
            )
            .join('')
    }
})

const OverviewContent = () => {
    setTimeout(() => {
        actions.loadMovieImage()
    }, 0)

    return `
        <div class="movie-images-carousel" id="movieImagesCarousel">

        </div>
    `
}

export default OverviewContent
