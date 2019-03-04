const CastMemberMoviesContent = actorMovies => {
    return `
        <div class="actor-movies movies-list">
        ${actorMovies
            .map(
                actorMovie =>
                    `
                    <div class="movies-list__item">
                        <div class="movies-list__image-wrapper" ${
                            actorMovie.Poster !== 'N/A'
                                ? `style="background-image: url(${
                                      actorMovie.Poster
                                  })`
                                : ''
                        }">
                            ${
                                actorMovie.Poster === 'N/A'
                                    ? `<i class="movies-list__image-placeholder-icon icon-image-card"></i>`
                                    : ``
                            }
                        </div>
                        <div class="movies-list__information text-center">
                            <p class="movies-list__movie-title">
                                ${actorMovie.Title}
                            </p>
                            <hr/>
                            <p class="movies-list__movie-info">
                                · ${actorMovie.Year} ·
                            </p>
                        </div>
                    </div>
                    `
            )
            .join('')}
        </div>
    `
}

export default CastMemberMoviesContent
