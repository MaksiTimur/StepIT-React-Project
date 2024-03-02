import FilterButton from "./FilterButton/FilterButton";

const Filters = ({ handleFilter }) => {
    return (
        <div className="filters">
            <FilterButton onClick={handleFilter} filterType={'All'}/>
            <FilterButton onClick={handleFilter} filterType={'Completed'} />
            <FilterButton onClick={handleFilter} filterType={'Uncompleted'} />
        </div>
    )
};

export default Filters;