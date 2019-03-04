import MovieImages from './MovieImages'
import MovieInformationCard from './MovieInformationCard'

const MovieOverviewContent = ({ movie }) => {
    return `
        ${MovieImages(movie)}
        ${MovieInformationCard(movie)}
    `
}

export default MovieOverviewContent
