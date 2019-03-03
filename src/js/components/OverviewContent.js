import MovieImages from './MovieImages'
import MovieInformationCard from './MovieInformationCard'

const OverviewContent = ({ movie }) => {
    return `
        ${MovieImages(movie)}
        ${MovieInformationCard(movie)}
    `
}

export default OverviewContent
