import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = ({
    searchQuery,
    setSearchQuery,
    handleSearch,
    selectedFilter,
    handleFilter,
}) => {
    return (
        <div className='app-container'>
            <Sidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                selectedFilter={selectedFilter}
                handleFilter={handleFilter}
            />
            <main className='main-content'>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
