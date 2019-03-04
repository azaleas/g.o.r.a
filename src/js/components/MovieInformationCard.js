const MovieInformationCard = movie => {
    return `
        <div class="card">
            ${
                movie.Ratings.length > 0
                    ? `
            <div class="movie-ratings text-center">
                ${movie.Ratings.map(rating => {
                    return `
                        <div class="movie-ratings-item">
                            <p class="movie-rating__score color-blue--dark">${
                                rating.Value
                            }</p>
                            <p class="movie-rating__source">${
                                rating.Source === 'Internet Movie Database'
                                    ? 'IMDb'
                                    : rating.Source
                            }</p>
                        </div>
                    `
                }).join('')}
            </div>
            `
                    : ``
            }
            
            <div class="movie-votes">
                <div class="movie-votes-information">
                    <p class="movie-votes__count">${
                        movie.imdbVotes
                    } people voted for this film</p>
                    <p class="movie-votes__source color-black--transparent">IMDb</p>
                </div>
                <div class="movie-votes__vote-icon-wrapper">
                    <i class="cur-pointer icon-thumbs-up movie-votes__vote-icon" onclick="alert('All votes are now closed. You snooze, you lose.')"></i>
                    <i class="cur-pointer icon-thumbs-down movie-votes__vote-icon" onclick="alert('All votes are now closed. You snooze, you lose.')"></i>
                </div>
            </div>
            <div class="movie-more-information">
                <input type="checkbox" class="movie-more-information__read-more-checkbox hidden" id="movie-more-information__read-more-checkbox" />
                <input type="checkbox" class="movie-plot__read-more-checkbox hidden" id="movie-plot__read-more-checkbox" />
                <p class="movie-more-information__movie-plot">
                    ${
                        movie.Plot.length > 175
                            ? `
                        <span class="movie-plot__first-half">${movie.Plot.slice(
                            0,
                            175
                        )}</span><span class="movie-plot__three-dots">...</span><span class="movie-plot__second-half">${movie.Plot.slice(
                                  175
                              )}</span>
                        <span class="movie-plot__read-more"><label for="movie-plot__read-more-checkbox" class="movie-plot__read-more--trigger">more <i class="icon-caret-down"></i></label></span>
                    `
                            : movie.Plot
                    }
                </p>
                <p class="movie-more-information__movie-release-information movie-more-information--expandable hidden">
                    Release date: 
                    <span class="movie-more-information__release-year">${
                        movie.Released
                    }
                    </span> <span class="color-blue--dark">(${
                        movie.Country
                    })</span>
                </p>
                <p class="movie-more-information__movie-director">
                    Director: <span class="color-blue--dark">${
                        movie.Director
                    }</span>
                </p>
                <p class="movie-more-information__movie-screenplay movie-more-information--expandable hidden">
                    Story by: ${movie.Writer}
                </p>
                <p class="movie-more-information__movie-awards movie-more-information--expandable hidden">
                    Awards & Nominations: ${movie.Awards}
                </p>
                <label for="movie-more-information__read-more-checkbox" class="movie-more-information__read-more--trigger cur-pointer">
                    <i class="icon-caret-down"></i> <p class="movie-more-information__read-more-text">Show <span>more</span><span class="hidden">less</span></p>
                </label>
            </div>
        </div>
    `
}

export default MovieInformationCard
