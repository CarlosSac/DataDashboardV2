import React from "react";

const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }) => {
    return (
        <form onSubmit={handleSearch} className='search-form'>
            <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search for a recipe...'
            />
            <button type='submit'>Search</button>
        </form>
    );
};

export default SearchForm;
