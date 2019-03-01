import { scrollToTop } from './../utils/helperFunctions'
import { globalEvents } from './../utils/globalEvents'

import OverviewContent from './OverviewContent'
import CastDetailsContent from './CastDetailsContent'

const actions = {
    onTabItemLeft(e) {
        e.target.nextElementSibling.classList.remove('active')
        e.target.classList.add('active')

        const carouselItem = document.querySelector(
            '.js-tab-content__carousel--left'
        )
        carouselItem.nextElementSibling.classList.remove('shown')
        carouselItem.nextElementSibling.classList.add('hidden')
        carouselItem.classList.remove('hidden')
        carouselItem.classList.add('shown')

        scrollToTop()
    },

    onTabItemRight(e) {
        e.target.previousElementSibling.classList.remove('active')
        e.target.classList.add('active')

        const carouselItem = document.querySelector(
            '.js-tab-content__carousel--right'
        )
        carouselItem.previousElementSibling.classList.remove('shown')
        carouselItem.previousElementSibling.classList.add('hidden')
        carouselItem.classList.remove('hidden')
        carouselItem.classList.add('shown')

        scrollToTop()
    }
}

const MovieItem = ({ movie }) => {
    window.removeEventListener('scroll', globalEvents.onStickyHeader, true)
    setTimeout(() => {
        document
            .querySelector('.js-tab-nav__item--left')
            .addEventListener('click', actions.onTabItemLeft.bind(actions))
        document
            .querySelector('.js-tab-nav__item--right')
            .addEventListener('click', actions.onTabItemRight.bind(actions))

        const headerElement = document.querySelector('.js-tab-nav'),
            headerElementOffsetTop = headerElement.offsetTop,
            tabContentElement = document.querySelector('.js-tab-content'),
            containerElement = document.querySelector('.js-container')

        globalEvents.onStickyHeader = e => {
            if (e.target === document) {
                if (window.pageYOffset > headerElementOffsetTop) {
                    headerElement.classList.add('sticky')
                    tabContentElement.classList.add('sticky-header--padding')
                } else {
                    headerElement.classList.remove('sticky')
                    tabContentElement.classList.remove('sticky-header--padding')
                }
            } else if (e.target === containerElement) {
                if (containerElement.scrollTop > headerElementOffsetTop) {
                    headerElement.classList.add('sticky')
                    headerElement.style.top = `${containerElement.offsetTop}px`
                    tabContentElement.classList.add('sticky-header--padding')
                } else {
                    headerElement.classList.remove('sticky')
                    headerElement.style.top = ''
                    tabContentElement.classList.remove('sticky-header--padding')
                }
            }
        }

        window.addEventListener('scroll', globalEvents.onStickyHeader, true)
    }, 0)

    return `
        <div class="navbar">
            <div class="movie-short-information">
                <p class="movie-short-information__title">${movie.Title}</p>
                <p class="movie-short-information__general-information">
                    <span class="movie-short-information__release-year">${
                        movie.Year
                    }</span> ·
                    <span class="movie-short-information__genre">${
                        movie.Genre
                    }</span> ·
                    <span class="movie-short-information__runtime">${
                        movie.Runtime
                    }</span>
                </p>
            </div>
            <nav class="tab-nav js-tab-nav">
                <div class="tab-nav__item cur-pointer active tab-nav__item--left js-tab-nav__item--left">
                    OVERVIEW
                </div>
                <div class="tab-nav__item cur-pointer tab-nav__item--right js-tab-nav__item--right">
                    CAST DETAILS
                </div>
                <div class="tab-nav__indicator"></div>
            </nav>
        </div>
        <div class="tab-content js-tab-content">
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
