import FilterButton from "./FilterButton/FilterButton";

const Filters = ({ handleClick }) => {
    return (
        <div className="filters">
            <FilterButton handleClick={handleClick} filterType={'All'} />
            <FilterButton handleClick={handleClick} filterType={'Completed'} />
            <FilterButton handleClick={handleClick} filterType={'Uncompleted'} />
        </div>
    )
};

export default Filters;