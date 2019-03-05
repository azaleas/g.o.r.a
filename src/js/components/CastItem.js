import CastOverviewContent from './CastOverviewContent'
import CastMemberMoviesContent from './CastMemberMoviesContent'

import Tabs from './Tabs'

import { store } from './../store'

const properties = {
    id: 'castItem'
}

store.subscribe(function GET_CAST_MEMBER() {
    const state = store.getState(),
        { actorInfo } = state,
        routeElement = document.getElementById(properties.id)

    if (Object.keys(actorInfo).length > 0) {
        routeElement.outerHTML = CastItem({
            actorInfo
        })
    }
})

const CastItem = ({ actorInfo = {} } = {}) => {
    let navbarTabContent = null

    if (Object.keys(actorInfo).length) {
        navbarTabContent = {
            left: {
                name: 'OVERVIEW',
                content: CastOverviewContent({ actorInfo })
            },
            right: {
                name: 'MOVIES',
                content: CastMemberMoviesContent(actorInfo.actorMovies)
            }
        }
    }

    return `
        <div id="${
            properties.id
        }" class="cast-item route-component js-route-component">
            ${
                Object.keys(actorInfo).length
                    ? Tabs({
                          navbarTabContent
                      })
                    : ``
            }
        </div>
    `
}

export default CastItem
