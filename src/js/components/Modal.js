import { setElementAttributes } from './../utils/helperFunctions'
import { store } from './../store'

const properties = {
    initialXPosition: null,
    isLocked: false,
    newTranslateX: null
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
        properties.newTranslateX = 0
        properties.isLocked = true
    },

    modalMoveTouch(e) {
        const { initialXPosition, isLocked } = properties

        const currentXPosition = e.touches[0].clientX,
            windowWidth = window.innerWidth,
            state = store.getState(),
            diffX = initialXPosition - currentXPosition,
            modalItemsElement = document.querySelector('.js-modal-items'),
            activeModalItemElement = document.querySelector(
                '.js-modal-item.active'
            ),
            activeDataIndex = +activeModalItemElement.dataset.index,
            { left, right } = modalItemsElement.getBoundingClientRect(),
            touchingWithinContainerLimits =
                currentXPosition >= left && currentXPosition <= right

        if (isLocked && touchingWithinContainerLimits) {
            const diff = +(diffX / windowWidth).toFixed(3)

            let newTranslateX = activeDataIndex + diff * 100

            if (
                (activeDataIndex === 0 && newTranslateX < 0) ||
                (activeDataIndex === state.movieImages.length - 1 &&
                    newTranslateX > 0)
            ) {
                newTranslateX = 0
            }

            modalItemsElement.setAttribute(
                'style',
                `transform: translate3d(${-newTranslateX}%,0,0)`
            )

            properties.newTranslateX = newTranslateX
        }
    },

    modalEndTouch(e) {
        properties.initialXPosition = null
        properties.isLocked = false

        const { newTranslateX } = properties,
            modalItemsElement = document.querySelector('.js-modal-items'),
            modalItemElements = document.querySelectorAll('.js-modal-item'),
            activeModalItemElement = document.querySelector(
                '.js-modal-item.active'
            ),
            currentModalItemIndex = +activeModalItemElement.dataset
                .modalItemIndex,
            activeDataIndex = +activeModalItemElement.dataset.index,
            state = store.getState()

        if (newTranslateX >= 15 || newTranslateX <= -15) {
            const next =
                    currentModalItemIndex === 2 ? 0 : currentModalItemIndex + 1,
                prev =
                    currentModalItemIndex === 0 ? 2 : currentModalItemIndex - 1,
                nextItemElement = modalItemElements[next],
                currentItemElement = modalItemElements[currentModalItemIndex],
                prevItemElement = modalItemElements[prev]
            if (newTranslateX <= -15) {
                modalItemsElement.setAttribute(
                    'style',
                    'transform: translate3d(100%,0,0); transition: all 0.2s linear;'
                )
                setTimeout(() => {
                    prevItemElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0);'
                    )
                    modalItemsElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0);'
                    )
                    prevItemElement.classList.add('active')

                    currentItemElement.setAttribute(
                        'style',
                        `transform: translate3d(100%,0,0)`
                    )
                    currentItemElement.classList.remove('active')

                    setElementAttributes(nextItemElement, {
                        style: `transform: translate3d(-100%,0,0);`,
                        'data-index': `${activeDataIndex - 2}`
                    })

                    nextItemElement.classList.add('hidden')
                    setTimeout(() => {
                        modalItemElements[next].classList.remove('hidden')
                    }, 100)

                    if (activeDataIndex - 2 >= 0) {
                        nextItemElement
                            .querySelector('.js-modal__image')
                            .setAttribute(
                                'src',
                                state.movieImages[activeDataIndex - 2]
                            )
                    }
                }, 200)
            } else if (newTranslateX >= 15) {
                modalItemsElement.setAttribute(
                    'style',
                    `transform: translate3d(-100%,0,0); transition: all 0.2s linear;`
                )

                setTimeout(() => {
                    nextItemElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0);'
                    )
                    modalItemsElement.setAttribute(
                        'style',
                        'transform: translate3d(0,0,0);'
                    )
                    nextItemElement.classList.add('active')

                    currentItemElement.setAttribute(
                        'style',
                        `transform: translate3d(-100%,0,0)`
                    )
                    currentItemElement.classList.remove('active')

                    setElementAttributes(prevItemElement, {
                        style: `transform: translate3d(100%,0,0);`,
                        'data-index': `${activeDataIndex + 2}`
                    })

                    prevItemElement.classList.add('hidden')
                    setTimeout(() => {
                        modalItemElements[prev].classList.remove('hidden')
                    }, 100)

                    if (activeDataIndex < state.movieImages.length - 2) {
                        prevItemElement
                            .querySelector('.js-modal__image')
                            .setAttribute(
                                'src',
                                state.movieImages[activeDataIndex + 2]
                            )
                    }
                }, 200)
            }
        } else {
            modalItemsElement.setAttribute(
                'style',
                'transform: translate3d(0,0,0); transition: all 0.2s linear;'
            )
        }
    }
}

const Modal = () => {
    setTimeout(function() {
        const modalElement = document.querySelector('.js-modal'),
            modalNavCloseElement = document.querySelector('.js-modal-nav-close')

        modalElement.addEventListener('touchstart', actions.modalStartTouch)
        modalElement.addEventListener('touchmove', actions.modalMoveTouch)
        modalElement.addEventListener('touchend', actions.modalEndTouch)
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
