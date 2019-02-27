const MoviesList = ({ moviesList }) =>
    moviesList
        .map(
            movie =>
                `
                <div class="movies-list__item" data-imdb-id=${movie.imdbID}>
                    <img src="${movie.Poster}" alt="${movie.Title} poster"/>
                    <p class="movies-list__movie-title">
                        ${movie.Title}
                    </p>
                    <p class="movies-list__movie-info">
                        Released year: <span>${movie.Year}</span> <br/>
                        Type: <span>${movie.Type}</span> <br/>
                    </p>
                </div>
            `
        )
        .join('')

export default MoviesList
