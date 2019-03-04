import CastOverviewContent from './CastOverviewContent'
import CastMemberMoviesContent from './CastMemberMoviesContent'

import Tabs from './Tabs'

const CastItem = ({ movie }) => {
    const navbarTabContent = {
        left: {
            name: 'OVERVIEW',
            content: CastOverviewContent({ movie })
        },
        right: {
            name: 'MOVIES',
            content: CastMemberMoviesContent({ movie })
        }
    }

    return Tabs({
        navbarInfoBlock,
        navBarDropDownMenuElements,
        navbarTabContent
    })
}

export default CastItem
