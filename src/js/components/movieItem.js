import { scrollToTop } from './../utils/helperFunctions'
import { globalEvents } from './../utils/globalEvents'

import OverviewContent from './OverviewContent'
import CastDetailsContent from './CastDetailsContent'

const actions = {
    onTabItemLeft(e) {
        e.target.nextElementSibling.classList.remove('active')
        e.target.classList.add('active')

        const sliderItem = document.querySelector(
            '.js-tab-content__slider--left'
        )
        sliderItem.nextElementSibling.classList.remove('shown')
        sliderItem.nextElementSibling.classList.add('hidden')
        sliderItem.classList.remove('hidden')
        sliderItem.classList.add('shown')

        scrollToTop()
    },

    onTabItemRight(e) {
        e.target.previousElementSibling.classList.remove('active')
        e.target.classList.add('active')

        const sliderItem = document.querySelector(
            '.js-tab-content__slider--right'
        )
        sliderItem.previousElementSibling.classList.remove('shown')
        sliderItem.previousElementSibling.classList.add('hidden')
        sliderItem.classList.remove('hidden')
        sliderItem.classList.add('shown')

        scrollToTop()
    }
}

const MovieItem = ({ movie }) => {
    window.removeEventListener('scroll', globalEvents.onStickyHeader, true)
    window.removeEventListener('click', globalEvents.onNavbarToggle, true)

    setTimeout(() => {
        document
            .querySelector('.js-tab-nav__item--left')
            .addEventListener('click', actions.onTabItemLeft)
        document
            .querySelector('.js-tab-nav__item--right')
            .addEventListener('click', actions.onTabItemRight)

        const headerElement = document.querySelector('.js-tab-nav'),
            headerElementOffsetTop = headerElement.offsetTop,
            tabContentElement = document.querySelector('.js-tab-content'),
            containerElement = document.querySelector('.js-container'),
            navbarDropdownMenuButtonElement = document.querySelector(
                '.navbar-dropdown-menu__button'
            ),
            navbarDropdownMenuContentElement = document.querySelector(
                '.js-navbar-dropdown-menu__content'
            )

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

        globalEvents.onNavbarToggle = e => {
            const navbarButtonClicked =
                e.target === navbarDropdownMenuButtonElement ||
                e.target.parentElement === navbarDropdownMenuButtonElement
            if (navbarButtonClicked) {
                navbarDropdownMenuContentElement.classList.toggle('hidden')
            } else {
                if (
                    !navbarDropdownMenuContentElement.classList.contains(
                        'hidden'
                    )
                ) {
                    navbarDropdownMenuContentElement.classList.add('hidden')
                }
            }
        }

        window.addEventListener('scroll', globalEvents.onStickyHeader, true)
        window.addEventListener('click', globalEvents.onNavbarToggle, true)
    }, 0)

    return `
        <div class="navbar">
            <div class="navbar-info-block">
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
                <div class="navbar-dropdown-menu">
                    <div class="navbar-dropdown-menu__button cur-pointer js-navbar-dropdown-menu__button">
                        <i class="icon-burger-slim"></i>
                    </div>
                    <div class="navbar-dropdown-menu__content color-black--transparent hidden js-navbar-dropdown-menu__content">
                        <div class="navbar-dropdown-menu__item cur-pointer" onclick="alert('Consider it done...')"><i class="icon-share"></i><span>Share</span></div>
                        <div class="navbar-dropdown-menu__item cur-pointer" onclick="alert('Consider it done...')"><i class="icon-claim"></i><span>Claim this knowledge panel</span></div>
                        <div class="navbar-dropdown-menu__item cur-pointer" onclick="alert('Consider it done...')"><i class="icon-feedback"></i><span>Send feedback</span></div>
                    </div>
                </div>
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
            <div class="tab-content__slider js-tab-content__slider">
                <div class="tab-content__panel tab-content__slider--left js-tab-content__slider--left">
                    ${OverviewContent({ movie })}
                </div>
                <div class="tab-content__panel tab-content__slider--right js-tab-content__slider--right">
                    ${CastDetailsContent({ movie })}
                </div>
            </div>
        </div>
    `
}

export default MovieItem
