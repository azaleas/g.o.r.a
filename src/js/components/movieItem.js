import OverviewContent from './OverviewContent'
import CastDetailsContent from './CastDetailsContent'

const actions = {
    onTabItemLeft(e) {
        e.target.nextElementSibling.classList.remove('active')
        e.target.classList.add('active')
        this._transitionCarouselElement('0%')

        const carouselItem = document.querySelector(
            '.js-tab-content__carousel--left'
        )
        carouselItem.nextElementSibling.classList.remove('shown')
        carouselItem.nextElementSibling.classList.add('hidden')
        carouselItem.classList.remove('hidden')
        carouselItem.classList.add('shown')
    },

    onTabItemRight(e) {
        e.target.previousElementSibling.classList.remove('active')
        e.target.classList.add('active')
        this._transitionCarouselElement('-50%')

        const carouselItem = document.querySelector(
            '.js-tab-content__carousel--right'
        )
        carouselItem.previousElementSibling.classList.remove('shown')
        carouselItem.previousElementSibling.classList.add('hidden')
        carouselItem.classList.remove('hidden')
        carouselItem.classList.add('shown')
    },

    _transitionCarouselElement(val) {
        // document.querySelector(
        //     '.js-tab-content__carousel'
        // ).style.transform = `translateX(${val})`
    }
}

const MovieItem = ({ movie }) => {
    setTimeout(() => {
        document
            .querySelector('.js-tab-nav__item--left')
            .addEventListener('click', actions.onTabItemLeft.bind(actions))
        document
            .querySelector('.js-tab-nav__item--right')
            .addEventListener('click', actions.onTabItemRight.bind(actions))
    }, 0)

    return `
        <nav class="tab-nav js-tab-nav">
            <div class="tab-nav__item active tab-nav__item--left js-tab-nav__item--left">
                Overview
            </div>
            <div class="tab-nav__item tab-nav__item--right js-tab-nav__item--right">
                Cast details
            </div>
            <div class="tab-nav__indicator"></div>
        </nav>
        <div class="tab-content">
            <div class="tab-content__carousel js-tab-content__carousel">
                <div class="tab-content__panel tab-content__carousel--left js-tab-content__carousel--left">
                    ${OverviewContent({ movie })}
                </div>
                <div class="tab-content__panel tab-content__carousel--right js-tab-content__carousel--right">
                    ${CastDetailsContent({ movie })}
                </div>
            </div>
        </div>
    `
}

export default MovieItem
