import { setElementAttributes } from './../utils/helperFunctions'
import { store } from './../store'

const properties = {
    initialXPosition: null,
    initialYPosition: null
}

const actions = {
    close() {
        const modalElement = document.querySelector('.js-modal'),
            activeModalItem = document.querySelector('.js-modal-item.active'),
            imageElement = activeModalItem.querySelector(
                '.js-modal__image-wrapper'
            ),
            modalImageElement = activeModalItem.querySelector(
                '.js-modal__image'
            )

        modalElement.classList.add('fade-out')
        imageElement.classList.add('scale-out')

        setTimeout(function() {
            modalImageElement.setAttribute('src', '')
            modalElement.classList.remove('active', 'preactive', 'fade-out')
            imageElement.classList.remove('scale-out')

            modalElement.setAttribute(
                'style',
                'left: auto; right: auto; top: auto; bottom: auto'
            )
        }, 200)
    },

    modalStartTouch(e) {
        properties.initialXPosition = e.touches[0].clientX
        properties.initialYPosition = e.touches[0].clientY
    },

    modalMoveTouch(e) {
        const { initialXPosition, initialYPosition } = properties

        const currentXPosition = e.touches[0].clientX,
            currentYPosition = e.touches[0].clientY,
            diffX = initialXPosition - currentXPosition,
            diffY = initialYPosition - currentYPosition

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

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX < 0 && activeDataIndex > 0) {
                setTimeout(function() {
                    modalItemsElement.setAttribute(
                        'style',
                        `transform: translate3d(${windowWidth}px,0,0)`
                    )

                    const next =
                            currentModalItemIndex === 2
                                ? 0
                                : currentModalItemIndex + 1,
                        prev =
                            currentModalItemIndex === 0
                                ? 2
                                : currentModalItemIndex - 1,
                        nextItemElement = modalItemElements[next],
                        currentItemElement =
                            modalItemElements[currentModalItemIndex],
                        prevItemElement = modalItemElements[prev]

                    prevItemElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0);'
                    )
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
                            .setAttribute(
                                'src',
                                state.movieImages[activeDataIndex - 2]
                            )

                        setTimeout(() => {
                            modalItemElements[next].classList.remove('hidden')
                        }, 400)
                    }
                    modalItemsElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0)'
                    )
                }, 400)
            } else if (
                diffX > 0 &&
                activeDataIndex + 2 <= state.movieImages.length
            ) {
                setTimeout(function() {
                    modalItemsElement.setAttribute(
                        'style',
                        `transform: translate3d(-${windowWidth}px,0,0)`
                    )

                    const next =
                            currentModalItemIndex === 2
                                ? 0
                                : currentModalItemIndex + 1,
                        prev =
                            currentModalItemIndex === 0
                                ? 2
                                : currentModalItemIndex - 1,
                        nextItemElement = modalItemElements[next],
                        currentItemElement =
                            modalItemElements[currentModalItemIndex],
                        prevItemElement = modalItemElements[prev]

                    nextItemElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0);'
                    )
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
                            .setAttribute(
                                'src',
                                state.movieImages[activeDataIndex + 2]
                            )

                        setTimeout(() => {
                            modalItemElements[prev].classList.remove('hidden')
                        }, 400)
                    }
                    modalItemsElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0)'
                    )
                }, 400)
            }
        }

        properties.initialXPosition = null
        properties.initialYPosition = null
    }
}

const Modal = () => {
    setTimeout(function() {
        const modalElement = document.querySelector('.js-modal'),
            modalNavCloseElement = document.querySelector('.js-modal-nav-close')

        modalElement.addEventListener('touchstart', actions.modalStartTouch)
        modalElement.addEventListener('touchmove', actions.modalMoveTouch)
        modalNavCloseElement.addEventListener('click', actions.close)
    }, 0)
    return `
        <div class="modal js-modal">
            <div class="modal-nav-close js-modal-nav-close">x</div>
            <div class="modal-items js-modal-items">
                <div class="modal-item js-modal-item">
                    <div class="modal__image-wrapper js-modal__image-wrapper">
                        <img src="" alt="Movie Image" class="modal__image js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <div class="card">
                            <p>
                                Eiusmod labore dolore incididunt consectetur culpa laboris. 
                                Minim Lorem esse ad ex dolore incididunt ad ut ipsum voluptate culpa. 
                                xercitation duis magna adipisicing elit aliquip irure. 
                                Magna labore consectetur aliquip nisi dolore nostrud enim sint elit magna laboris irure id. 
                                Labore amet tempor deserunt voluptate ex quis.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-item js-modal-item">
                    <div class="modal__image-wrapper js-modal__image-wrapper">
                        <img src="" alt="Movie Image" class="modal__image js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <div class="card">
                            <p>
                                Eiusmod labore dolore incididunt consectetur culpa laboris. 
                                Minim Lorem esse ad ex dolore incididunt ad ut ipsum voluptate culpa. 
                                xercitation duis magna adipisicing elit aliquip irure. 
                                Magna labore consectetur aliquip nisi dolore nostrud enim sint elit magna laboris irure id. 
                                Labore amet tempor deserunt voluptate ex quis.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-item js-modal-item">
                    <div class="modal__image-wrapper js-modal__image-wrapper">
                        <img src="" alt="Movie Image" class="modal__image js-modal__image"/>
                    </div>
                    <div class="modal-content">
                        <div class="card">
                            <p>
                                Eiusmod labore dolore incididunt consectetur culpa laboris. 
                                Minim Lorem esse ad ex dolore incididunt ad ut ipsum voluptate culpa. 
                                xercitation duis magna adipisicing elit aliquip irure. 
                                Magna labore consectetur aliquip nisi dolore nostrud enim sint elit magna laboris irure id. 
                                Labore amet tempor deserunt voluptate ex quis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export default Modal
