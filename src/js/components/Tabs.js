import { scrollToTop } from './../utils/helperFunctions'
import { globalEvents } from './../utils/globalEvents'

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

const Tabs = ({
    navbarInfoBlock = '',
    navBarDropDownMenuElements = [],
    navbarTabContent = {}
}) => {
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
                ${navbarInfoBlock}
                ${
                    navBarDropDownMenuElements.length
                        ? `<div class="navbar-dropdown-menu">
                        <div class="navbar-dropdown-menu__button cur-pointer js-navbar-dropdown-menu__button">
                            <i class="icon-burger-slim"></i>
                        </div>
                        <div class="navbar-dropdown-menu__content color-black--transparent hidden js-navbar-dropdown-menu__content">
                            ${navBarDropDownMenuElements
                                .map(
                                    item =>
                                        `<div 
                                    class="navbar-dropdown-menu__item cur-pointer" 
                                    onclick="alert('Consider it done...')">
                                    ${item}
                                </div>
                                `
                                )
                                .join('')}
                        </div>
                    </div>
                    `
                        : ``
                }
            </div>
            <nav class="tab-nav js-tab-nav">
                <div class="tab-nav__item cur-pointer active tab-nav__item--left js-tab-nav__item--left">
                    ${navbarTabContent.left.name}
                </div>
                <div class="tab-nav__item cur-pointer tab-nav__item--right js-tab-nav__item--right">
                    ${navbarTabContent.right.name}
                </div>
                <div class="tab-nav__indicator"></div>
            </nav>
        </div>
        <div class="tab-content js-tab-content">
            <div class="tab-content__slider js-tab-content__slider">
                <div class="tab-content__panel tab-content__slider--left js-tab-content__slider--left">
                    ${navbarTabContent.left.content}
                </div>
                <div class="tab-content__panel tab-content__slider--right js-tab-content__slider--right">
                    ${navbarTabContent.right.content}
                </div>
            </div>
        </div>
    `
}

export default Tabs
