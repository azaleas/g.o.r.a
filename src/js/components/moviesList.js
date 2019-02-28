const MoviesList = ({ moviesList }) =>
    moviesList
        .map(
            movie =>
                `
                <div class="movies-list__item cur-pointer" data-imdb-id=${
                    movie.imdbID
                }>
                    <div class="movies-list__image-wrapper" style="background-image: url(${
                        movie.Poster !== 'N/A' ? movie.Poster : ''
                    })"></div>
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
