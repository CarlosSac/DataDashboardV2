import React from "react";
import SearchForm from "./SearchForm";
import Filters from "./Filters";

const Sidebar = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    selectedFilter,
    handleFilter,
}) => {
    return (
        <aside className='sidebar'>
            <h2>Search Recipes</h2>
            <SearchForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
            />
            <Filters
                selectedFilter={selectedFilter}
                handleFilter={handleFilter}
            />
        </aside>
    );
};

export default Sidebar;
