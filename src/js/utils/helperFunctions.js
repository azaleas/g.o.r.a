import smoothscroll from 'smoothscroll-polyfill'

// Polyfill for scrollTo behavior options
smoothscroll.polyfill()

export function scrollToTop() {
    window.scroll({ top: 0, left: 0 })
}

export function setElementAttributes(element, attrs = {}) {
    Object.keys(attrs).forEach(attr => element.setAttribute(attr, attrs[attr]))
}
