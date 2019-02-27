import alanos from './alanos'
import './../style/index.scss'

const paragraph = document.createElement('p')
paragraph.innerHTML = alanos

document.body.prepend(paragraph)
