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

    close() {
        const modalElement = document.querySelector('.modal'),
            // screenElement = document.querySelector('.screen'),
            imageElement = document.querySelector('.image'),
            modalImageElement = modalElement.querySelector('.js-modal__image')

        modalElement.classList.add('fade-out')
        // screenElement.classList.add('fade-out')
        imageElement.classList.add('scale-out')

        setTimeout(function() {
            modalImageElement.setAttribute('src', '')
            modalElement.classList.remove('active', 'preactive', 'fade-out')
            // screenElement.classList.remove('active', 'fade-out')
            imageElement.classList.remove('scale-out')

            modalElement.classList.add('offset-auto')
        }, 400)
    },

    enableModal(e) {
        const modalElement = document.querySelector('.modal'),
            modalImageElement = modalElement.querySelector('.js-modal__image'),
            // screenElement = document.querySelector('.screen'),
            sliderItemElement = e.target.closest(
                '.js-movie-images-slider__item'
            ),
            targetElement = e.target,
            state = store.getState()

        if (sliderItemElement && sliderItemElement.dataset.imageIndex) {
            let imageSource = [],
                imageIndex = sliderItemElement.dataset.imageIndex

            if (imageIndex === 'poster') {
                imageSource = state.movie.Poster
            } else {
                imageSource = state.movieImages[imageIndex]
            }

            modalImageElement.setAttribute('src', imageSource)

            modalElement.classList.add('preactive')

            const {
                    left,
                    right,
                    top,
                    bottom
                } = targetElement.getBoundingClientRect(),
                scroll = window.innerWidth - document.body.clientWidth

            modalElement.setAttribute(
                'style',
                `left: ${left}px;
            top: ${top}px;
            right: ${window.innerWidth - scroll / 2 - right}px;
            bottom: ${window.innerHeight - bottom}px;`
            )

            setTimeout(function() {
                modalElement.classList.add('active')
                // screenElement.classList.add('active')
            }, 0)
        }
    },

    next() {},

    prev() {}
}

store.subscribe(function GET_MOVIE_IMAGES() {
    const state = store.getState(),
        { movieImages, movie } = state,
        movieImagessliderElement = document.querySelector('#movieImagesslider')

    if (movieImages.length > 0) {
        movieImagessliderElement.innerHTML = `
            ${
                movie.Poster !== 'N/A'
                    ? `<div class="movie-images-slider__item js-movie-images-slider__item" data-image-index="poster">
                            <img src="${
                                movie.Poster
                            }" alt="Movie Poster" class="movie-images-slider__image"/>
                        </div>`
                    : ``
            }
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

const MovieImages = () => {
    actions.loadMovieImage()

    setTimeout(function() {
        const closeElement = document.querySelector('.close'),
            imagesliderElement = document.querySelector('.movie-images-slider')
        closeElement.addEventListener('click', actions.close)
        imagesliderElement.addEventListener('click', actions.enableModal)
        document.querySelector('.next').addEventListener('click', actions.next)
        document.querySelector('.prev').addEventListener('click', actions.prev)
    }, 0)
    return `
        <div class="movie-images-slider js-movie-images-slider" id="movieImagesslider">

        </div>
        <div class="modal">
            <div class="close">X</div>
            <button class="prev">Prev</button>
            <button class="next">Next</button>
            <div class="modal-items">
                <div class="modal-item js-modal-item" data-index="1">
                    <div class="image">
                        <img src="" alt="Movie Image" class="img-responsive js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <label>Field 1: </label>

                        <input type="text" />
                    </div>
                </div>
                <div class="modal-item js-modal-item" data-index="2">
                    <div class="image">
                        <img src="" alt="Movie Image" class="img-responsive js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <label>Field 2: </label>

                        <input type="text" />
                    </div>
                </div>
                <div class="modal-item js-modal-item" data-index="3">
                    <div class="image">
                        <img src="" alt="Movie Image" class="img-responsive js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <label>Field 3: </label>

                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    `
}

export default MovieImages
