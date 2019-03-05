import { getCastImages, getCastMember } from './../utils/remoteService'
import { store } from './../store'

const properties = {
    id: 'movieCastImages'
}

const actions = {
    loadCastImages(actors) {
        getCastImages(actors).then(response => {
            store.dispatch({
                type: 'GET_CAST_IMAGES',
                payload: response
            })
        })
    },

    getCastMember(e) {
        const elementTarget = e.target,
            movieCastItem = elementTarget.closest('.js-movie-cast-item'),
            { actorId, actorName } = movieCastItem.dataset

        store.dispatch({
            type: 'DATA_LOADING'
        })
        getCastMember({ actorId, actorName }).then(response => {
            store.dispatch({
                type: 'GET_CAST_MEMBER',
                payload: response
            })
        })
    }
}

store.subscribe(function GET_CAST_IMAGES() {
    const state = store.getState(),
        { castImages } = state,
        movieCastImagesElement = document.getElementById(properties.id)

    if (castImages.length > 0) {
        movieCastImagesElement.innerHTML = castImages
            .map(
                item =>
                    `
                    <div class="movie-cast-item js-movie-cast-item" data-actor-id="${
                        item.actorId
                    }" data-actor-name="${item.actorName}">
                        <img class="img-responsive mar-hor--auto movie-cast-item__actor-image" src="${
                            item.actorImage
                        }" alt="${item.actorName}"/>
                        <div class="movie-cast-item__actor-information">
                            <p class="movie-cast-item__actor-name">${
                                item.actorName
                            }</p>
                            <p class="movie-cast-item__actor-role color-black--transparent">${
                                item.actorPlayedRole
                            }</p>
                        </div>
                    </div>
                `
            )
            .join('')
    }
})

const CastDetailsContent = ({ movie }) => {
    setTimeout(() => {
        actions.loadCastImages(movie.Actors)
        document
            .getElementById(properties.id)
            .addEventListener('click', actions.getCastMember)
    }, 0)

    return `
        <div class="movie-cast-images" id="${properties.id}">
        
        </div>
    `
}

export default CastDetailsContent
