const FilterButton = ({ handleFilter, filterType }) => {
    let filterContent = null;

    switch (filterType) {
        case 'All':
            filterContent = 'All';
            break;

        case 'Completed':
            filterContent = 'Completed';
            break;

        case 'Uncompleted':
            filterContent = 'Uncompleted';
            break;

        default:
            filterContent = 'Incorrect';
    }

    return (
        <button
            className="filter-button"
            onClick={() => handleFilter(filterType)}
        >
            {filterContent}
        </button>
    )
};

export default FilterButton;