import { getMovieImages } from './../utils/remoteService'
import { setElementAttributes } from './../utils/helperFunctions'
import { store } from './../store'

import Modal from './Modal'
import ImagesSlider from './ImagesSlider'

const properties = {
    jsImageSliderClassIdentifier: 'js-movie-images-slider'
}

const actions = {
    loadMovieImage(movie) {
        getMovieImages(movie).then(response => {
            store.dispatch({
                type: 'GET_MOVIE_IMAGES',
                payload: response
            })
        })
    },

    setModalImages(imageIndex) {
        const modalImageElements = document.querySelectorAll(
                '.js-modal__image'
            ),
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
        }

        modalItemsElement.setAttribute('style', 'transform: translate3d(0,0,0)')
        modalImageElements.forEach((item, index) =>
            setElementAttributes(item, {
                src: imageSources[index],
                width: `${windowWidth}px`
            })
        )
        modalItemElements.forEach((item, index) =>
            item.setAttribute('data-modal-item-index', index)
        )
    },

    enableModal(e) {
        const modalElement = document.querySelector('.js-modal'),
            containerElement = document.querySelector('.js-container'),
            modalNavCloseElement = document.querySelector(
                '.js-modal-nav-close'
            ),
            sliderItemElement = e.target.closest('.js-images-slider__item'),
            targetElement = e.target

        if (sliderItemElement && sliderItemElement.dataset.imageIndex) {
            this.setModalImages(+sliderItemElement.dataset.imageIndex)
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
                if (window.innerWidth < 768) {
                    modalNavCloseElement.setAttribute(
                        'style',
                        'left: 0; top: 0;'
                    )
                    modalElement.setAttribute(
                        'style',
                        `left: 0px;
                        top: 0px;
                        right: 0px;
                        bottom: 0px;`
                    )
                } else {
                    const {
                        left,
                        top
                    } = containerElement.getBoundingClientRect()
                    modalNavCloseElement.setAttribute(
                        'style',
                        `left: ${left}px; top: ${top}px;`
                    )
                    modalElement.setAttribute(
                        'style',
                        `left: ${left}px;
                        top: ${top}px;
                        right: ${left}px;
                        bottom: ${top}px;`
                    )
                }
            }, 0)
        }
    }
}

store.subscribe(function GET_MOVIE_IMAGES() {
    const state = store.getState(),
        { movieImages } = state,
        movieImagesSlider = document.querySelector(
            `.${properties.jsImageSliderClassIdentifier}`
        )

    if (movieImages.length > 0) {
        movieImagesSlider.outerHTML = ImagesSlider({
            jsClassIdentifier: properties.jsImageSliderClassIdentifier,
            images: movieImages
        })
    }
})

const MovieImages = movie => {
    actions.loadMovieImage(movie)

    setTimeout(function() {
        const imagesSliderElement = document.querySelector(
            `.${properties.jsImageSliderClassIdentifier}`
        )

        imagesSliderElement.addEventListener(
            'click',
            actions.enableModal.bind(actions)
        )
    }, 0)
    return `
        ${ImagesSlider({
            jsClassIdentifier: properties.jsImageSliderClassIdentifier
        })}
        ${Modal()}
    `
}

export default MovieImages
