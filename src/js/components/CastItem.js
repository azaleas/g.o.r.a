import CastOverviewContent from './CastOverviewContent'
import CastMemberMoviesContent from './CastMemberMoviesContent'

import Tabs from './Tabs'

const CastItem = ({ actorInfo }) => {
    const navbarTabContent = {
        left: {
            name: 'OVERVIEW',
            content: CastOverviewContent({ actorInfo })
        },
        right: {
            name: 'MOVIES',
            content: CastMemberMoviesContent(actorInfo.actorMovies)
        }
    }

    return Tabs({
        navbarTabContent
    })
}

export default CastItem
