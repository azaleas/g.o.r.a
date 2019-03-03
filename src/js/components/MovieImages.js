import { getMovieImages } from './../utils/remoteService'
import { setElementAttributes } from './../utils/helperFunctions'
import { store } from './../store'

const actions = {
    loadMovieImage(movie) {
        getMovieImages(movie).then(response => {
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

            modalElement.setAttribute(
                'style',
                'left: auto; right: auto; top: auto; bottom: auto'
            )
        }, 400)
    },

    setCarouselImages(imageIndex) {
        const modalImageElements = document.querySelectorAll(
                '.js-modal__image'
            ),
            nextButtonElement = document.querySelector('.next'),
            prevButtonElement = document.querySelector('.prev'),
            modalItemsElement = document.querySelector('.js-modal-items'),
            modalItemElements = document.querySelectorAll('.js-modal-item'),
            windowWidth = window.innerWidth,
            state = store.getState(),
            { movieImages } = state

        let imageSources = []

        modalItemElements.forEach(item => item.classList.remove('active'))

        if (imageIndex === 0) {
            imageSources.push(movieImages[imageIndex])
            imageSources.push(movieImages[imageIndex + 1])
            imageSources.push(movieImages[imageIndex + 2])

            setElementAttributes(modalItemElements[0], {
                style: 'transform: translate3d(0,0,0);',
                'data-index': imageIndex
            })

            setElementAttributes(modalItemElements[1], {
                style: `transform: translate3d(${windowWidth}px,0,0)`,
                'data-index': imageIndex + 1,
                'data-translate-value': `${windowWidth}`
            })

            setElementAttributes(modalItemElements[2], {
                style: `transform: translate3d(${2 * windowWidth}px,0,0)`,
                'data-index': imageIndex + 2
            })

            modalItemElements[0].classList.add('active')

            prevButtonElement.classList.add('hidden')
            nextButtonElement.classList.remove('hidden')
        } else if (imageIndex === movieImages.length - 1) {
            imageSources.push(movieImages[imageIndex - 2])
            imageSources.push(movieImages[imageIndex - 1])
            imageSources.push(movieImages[imageIndex])

            setElementAttributes(modalItemElements[0], {
                style: `transform: translate3d(-${2 * windowWidth}px,0,0)`,
                'data-index': imageIndex - 2
            })

            setElementAttributes(modalItemElements[1], {
                style: `transform: translate3d(-${windowWidth}px,0,0)`,
                'data-index': imageIndex - 1
            })

            setElementAttributes(modalItemElements[2], {
                style: 'transform: translate3d(0,0,0)',
                'data-index': imageIndex
            })

            modalItemElements[2].classList.add('active')

            nextButtonElement.classList.add('hidden')
            prevButtonElement.classList.remove('hidden')
        } else {
            imageSources.push(movieImages[imageIndex - 1])
            imageSources.push(movieImages[imageIndex])
            imageSources.push(movieImages[imageIndex + 1])

            setElementAttributes(modalItemElements[0], {
                style: `transform: translate3d(-${windowWidth}px,0,0)`,
                'data-index': imageIndex - 1
            })

            setElementAttributes(modalItemElements[1], {
                style: 'transform: translate3d(0,0,0)',
                'data-index': imageIndex
            })

            setElementAttributes(modalItemElements[2], {
                style: `transform: translate3d(${windowWidth}px,0,0)`,
                'data-index': imageIndex + 1
            })

            modalItemElements[1].classList.add('active')

            nextButtonElement.classList.remove('hidden')
            prevButtonElement.classList.remove('hidden')
        }

        modalItemsElement.setAttribute('style', 'transform: translate3d(0,0,0)')
        modalImageElements.forEach((item, index) =>
            item.setAttribute('src', imageSources[index])
        )
        modalItemElements.forEach((item, index) =>
            item.setAttribute('data-modal-item-index', index)
        )
    },

    enableModal(e) {
        const modalElement = document.querySelector('.modal'),
            // screenElement = document.querySelector('.screen'),
            sliderItemElement = e.target.closest(
                '.js-movie-images-slider__item'
            ),
            targetElement = e.target

        if (sliderItemElement && sliderItemElement.dataset.imageIndex) {
            this.setCarouselImages(+sliderItemElement.dataset.imageIndex)
            const {
                    left,
                    right,
                    top,
                    bottom
                } = targetElement.getBoundingClientRect(),
                scroll = window.innerWidth - document.body.clientWidth

            modalElement.classList.add('preactive')

            modalElement.setAttribute(
                'style',
                `left: ${left}px;
            top: ${top}px;
            right: ${window.innerWidth - scroll / 2 - right}px;
            bottom: ${window.innerHeight - bottom}px;`
            )

            setTimeout(() => {
                modalElement.classList.add('active')
            }, 0)
        }
    },

    next() {
        const activeModalItemElement = document.querySelector(
                '.js-modal-item.active'
            ),
            modalItemsElement = document.querySelector('.js-modal-items'),
            modalItemElements = document.querySelectorAll('.js-modal-item'),
            activeDataIndex = +activeModalItemElement.dataset.index,
            currentModalItemIndex = +activeModalItemElement.dataset
                .modalItemIndex,
            windowWidth = window.innerWidth,
            state = store.getState()

        document.querySelector('.prev').classList.remove('hidden')

        modalItemsElement.setAttribute(
            'style',
            `transform: translate3d(-${windowWidth}px,0,0)`
        )

        const next =
                currentModalItemIndex === 2 ? 0 : currentModalItemIndex + 1,
            prev = currentModalItemIndex === 0 ? 2 : currentModalItemIndex - 1,
            nextItemElement = modalItemElements[next],
            currentItemElement = modalItemElements[currentModalItemIndex],
            prevItemElement = modalItemElements[prev]

        nextItemElement.setAttribute('style', 'transform: translate3d(0,0,0);')
        nextItemElement.classList.add('active')

        currentItemElement.setAttribute(
            'style',
            `transform: translate3d(-${windowWidth}px,0,0)`
        )
        currentItemElement.classList.remove('active')

        if (activeDataIndex < state.movieImages.length - 2) {
            prevItemElement.classList.add('hidden')
            setElementAttributes(prevItemElement, {
                style: `transform: translate3d(${windowWidth}px,0,0);`,
                'data-index': `${activeDataIndex + 2}`
            })

            prevItemElement
                .querySelector('.js-modal__image')
                .setAttribute('src', state.movieImages[activeDataIndex + 2])

            setTimeout(() => {
                modalItemElements[prev].classList.remove('hidden')
            }, 400)
        }
        modalItemsElement.setAttribute('style', 'transform: translate3d(0,0,0)')
        if (activeDataIndex + 2 >= state.movieImages.length) {
            document.querySelector('.next').classList.add('hidden')
        }
    },

    prev() {
        const activeModalItemElement = document.querySelector(
                '.js-modal-item.active'
            ),
            modalItemsElement = document.querySelector('.js-modal-items'),
            modalItemElements = document.querySelectorAll('.js-modal-item'),
            activeDataIndex = +activeModalItemElement.dataset.index,
            currentModalItemIndex = +activeModalItemElement.dataset
                .modalItemIndex,
            windowWidth = window.innerWidth,
            state = store.getState()

        document.querySelector('.next').classList.remove('hidden')

        modalItemsElement.setAttribute(
            'style',
            `transform: translate3d(${windowWidth}px,0,0)`
        )

        const next =
                currentModalItemIndex === 2 ? 0 : currentModalItemIndex + 1,
            prev = currentModalItemIndex === 0 ? 2 : currentModalItemIndex - 1,
            nextItemElement = modalItemElements[next],
            currentItemElement = modalItemElements[currentModalItemIndex],
            prevItemElement = modalItemElements[prev]

        prevItemElement.setAttribute('style', 'transform: translate3d(0,0,0);')
        prevItemElement.classList.add('active')

        currentItemElement.setAttribute(
            'style',
            `transform: translate3d(${windowWidth}px,0,0)`
        )
        currentItemElement.classList.remove('active')

        if (activeDataIndex - 2 >= 0) {
            nextItemElement.classList.add('hidden')
            setElementAttributes(nextItemElement, {
                style: `transform: translate3d(-${windowWidth}px,0,0);`,
                'data-index': `${activeDataIndex - 2}`
            })

            nextItemElement
                .querySelector('.js-modal__image')
                .setAttribute('src', state.movieImages[activeDataIndex - 2])

            setTimeout(() => {
                modalItemElements[next].classList.remove('hidden')
            }, 400)
        }
        modalItemsElement.setAttribute('style', 'transform: translate3d(0,0,0)')
        if (activeDataIndex < 2) {
            document.querySelector('.prev').classList.add('hidden')
        }
    }
}

store.subscribe(function GET_MOVIE_IMAGES() {
    const state = store.getState(),
        { movieImages, movie } = state,
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

const MovieImages = movie => {
    actions.loadMovieImage(movie)

    setTimeout(function() {
        const closeElement = document.querySelector('.close'),
            imagesliderElement = document.querySelector('.movie-images-slider')
        closeElement.addEventListener('click', actions.close)
        imagesliderElement.addEventListener(
            'click',
            actions.enableModal.bind(actions)
        )
        document
            .querySelector('.next')
            .addEventListener('click', actions.next.bind(actions))
        document
            .querySelector('.prev')
            .addEventListener('click', actions.prev.bind(actions))
    }, 0)
    return `
        <div class="movie-images-slider js-movie-images-slider" id="movieImagesslider">

        </div>
        <div class="modal">
            <div class="close">X</div>
            <button class="prev hidden">Prev</button>
            <button class="next hidden">Next</button>
            <div class="modal-items js-modal-items">
                <div class="modal-item js-modal-item">
                    <div class="image">
                        <img src="" alt="Movie Image" class="img-responsive js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <label>Field 1: </label>

                        <input type="text" />
                    </div>
                </div>
                <div class="modal-item js-modal-item">
                    <div class="image">
                        <img src="" alt="Movie Image" class="img-responsive js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <label>Field 2: </label>

                        <input type="text" />
                    </div>
                </div>
                <div class="modal-item js-modal-item">
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
