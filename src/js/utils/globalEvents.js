// Will handle global events, attached to document/window.

const globalEvents = {
    onStickyHeader: {
        type: 'scroll',
        identifier: '.js-tab-nav',
        action: function onStickyHeader(e) {
            const headerElement = document.querySelector('.js-tab-nav'),
                headerElementOffsetTop = headerElement.offsetTop,
                tabContentElement = document.querySelector('.js-tab-content'),
                containerElement = document.querySelector('.js-container')

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
        },
        useCapture: true
    },

    onNavbarToggle: {
        type: 'click',
        identifier: '.js-navbar-dropdown-menu',
        action: function onNavbarToggle(e) {
            const navbarDropdownMenuButtonElement = document.querySelector(
                    '.js-navbar-dropdown-menu__button'
                ),
                navbarDropdownMenuContentElement = document.querySelector(
                    '.js-navbar-dropdown-menu__content'
                )

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
        },
        useCapture: true
    }
}

export default globalEvents
