import MovieImages from './MovieImages'
import MovieInformationCard from './MovieInformationCard'

const OverviewContent = ({ movie }) => {
    return `
        ${MovieImages()}
        ${MovieInformationCard(movie)}
    `
}

export default OverviewContent
