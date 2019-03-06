import { scrollToTop } from './../utils/helperFunctions'
import globalEvents from './../utils/globalEvents'

const actions = {
    onTabItemLeft(e) {
        e.target.nextElementSibling.classList.remove('active')
        e.target.classList.add('active')

        const sliderItem = document.querySelector(
            '.js-tab-content__slider--left'
        )
        sliderItem.nextElementSibling.classList.remove('fade-in')
        sliderItem.nextElementSibling.classList.add('fade-out')
        sliderItem.classList.remove('fade-out')
        sliderItem.classList.add('fade-in')

        scrollToTop()
    },

    onTabItemRight(e) {
        e.target.previousElementSibling.classList.remove('active')
        e.target.classList.add('active')

        const sliderItem = document.querySelector(
            '.js-tab-content__slider--right'
        )
        sliderItem.previousElementSibling.classList.remove('fade-in')
        sliderItem.previousElementSibling.classList.add('fade-out')
        sliderItem.classList.remove('fade-out')
        sliderItem.classList.add('fade-in')

        scrollToTop()
    }
}

const Tabs = ({
    navbarInfoBlock = '',
    navBarDropDownMenuElements = [],
    navbarTabContent = {}
}) => {
    setTimeout(() => {
        document
            .querySelector('.js-tab-nav__item--left')
            .addEventListener('click', actions.onTabItemLeft)
        document
            .querySelector('.js-tab-nav__item--right')
            .addEventListener('click', actions.onTabItemRight)

        window.addEventListener(
            globalEvents.onStickyHeader.type,
            globalEvents.onStickyHeader.action,
            globalEvents.onStickyHeader.useCapture
        )
        if (navBarDropDownMenuElements.length) {
            window.addEventListener(
                globalEvents.onNavbarToggle.type,
                globalEvents.onNavbarToggle.action,
                globalEvents.onNavbarToggle.useCapture
            )
        }
    }, 0)

    return `
        <div class="navbar">
            <div class="navbar-info-block">
                ${navbarInfoBlock}
                ${
                    navBarDropDownMenuElements.length
                        ? `<div class="navbar-dropdown-menu js-navbar-dropdown-menu">
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
                <div class="tab-content__panel tab-content__slider--left fade-in js-tab-content__slider--left">
                    ${navbarTabContent.left.content}
                </div>
                <div class="tab-content__panel tab-content__slider--right fade-out js-tab-content__slider--right">
                    ${navbarTabContent.right.content}
                </div>
            </div>
        </div>
    `
}

export default Tabs
