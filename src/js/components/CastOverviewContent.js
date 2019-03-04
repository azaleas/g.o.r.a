import ImagesSlider from './ImagesSlider'
import MovieInformationCard from './MovieInformationCard'

const CastOverviewContent = ({ actorInfo }) => {
    return `
        ${ImagesSlider({
            images: actorInfo.actorImages
        })}
        `
    // ${MovieInformationCard(movie)}
}

export default CastOverviewContent
