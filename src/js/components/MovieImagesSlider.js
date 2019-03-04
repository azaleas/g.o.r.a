import { getMovieImages } from './../utils/remoteService'
import { store } from './../store'

store.subscribe(function GET_MOVIE_IMAGES() {
    const state = store.getState(),
        { movieImages } = state,
        movieImagessliderElement = document.querySelector('#movieImagesslider')

    if (movieImages.length > 0) {
        movieImagessliderElement.innerHTML = `
            ${movieImages
                .map(
                    (element, index) =>
                        `
                        <div class="movie-images-slider__item js-movie-images-slider__item" data-image-index="${index}">
                            <img src="${element}" alt="Movie Images" class="movie-images-slider__image"/>
                        </div>
                    `
                )
                .join('')}
                    <div class="movie-images-slider__item js-movie-images-slider__item">
                        <div class="view-all-images__wrapper cur-pointer" onclick="alert('One day...')">
                            <i class="icon-right-arrow view-all-images__icon color-blue"></i>
                            <p class="view-all-images__text color-black--transparent">View all</p>
                        </div>
                    </div>
                `
    }
})

const MovieImagesSlider = () => {
    return `
        <div class="movie-images-slider js-movie-images-slider" id="movieImagesslider">

        </div>
    `
}

export default MovieImagesSlider
