import React from "react";
import PropTypes from "prop-types";

import { InputFields, Button, SearchContainer } from "../common";

const SearchFlower = ({ search_name, handleSearch, onChange, handleCloseSearch }) => {
    return (
        <SearchContainer
            data-test="SearchFlowerComponent"
            searchForm={
                <form noValidate onSubmit={e => handleSearch(e)} autoComplete="off">
                    <InputFields
                        type="text"
                        name="search_name"
                        onChange={onChange}
                        value={search_name}
                        label="Variety Name"
                    />
                    <div className="d-flex justify-content-between">
                        <Button
                            onClick={handleCloseSearch}
                            className="btn btn-sm btn-outline-danger waves-effect ml-0"
                            otherProps={<i className="fas fa-window-close mr-1" />}
                            value=" Close"
                        />

                        <Button
                            type="submit"
                            className="btn btn-sm btn-outline-default waves-effect mr-0"
                            otherProps={<i className="fas fa-search mr-1" />}
                            value=" Search"
                        />
                    </div>
                </form>
            }
        />
    );
}

export default SearchFlower;

SearchFlower.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    handleCloseSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    search_name: PropTypes.string
};
