const SearchForm = ({ id }) => {
    return `
        <form id="${id}" class="form">
            <input name="search-input" class="form-input" type="text"/>
            <input class="btn btn-default" type="submit" value="Search"/>
        </form>
    `
}

export default SearchForm
