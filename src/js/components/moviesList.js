const MoviesList = ({ moviesList }) =>
    moviesList
        .map(
            movie =>
                `
                <div class="movies-list__item cur-pointer" data-imdb-id=${
                    movie.imdbID
                }>
                    <div class="movies-list__image-wrapper" ${
                        movie.Poster !== 'N/A'
                            ? `style="background-image: url(${movie.Poster})`
                            : ''
                    }">
                        ${
                            movie.Poster === 'N/A'
                                ? `<i class="movies-list__image-placeholder-icon icon-image-card"></i>`
                                : ``
                        }
                    </div>
                    <div class="movies-list__information text-center">
                        <p class="movies-list__movie-title">
                            ${movie.Title}
                        </p>
                        <hr/>
                        <p class="movies-list__movie-info">
                            · ${movie.Year} ·
                        </p>
                    </div>
                </div>
            `
        )
        .join('')

export default MoviesList
