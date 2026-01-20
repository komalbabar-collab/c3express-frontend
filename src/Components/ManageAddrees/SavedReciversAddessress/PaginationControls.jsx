const PaginationControls = ({ page, handleNext, handlePrevious, dispableNext }) => {
    return (
        <div className="a-row a-spacing-extra-large addressbook-footer">
            <span className="a-declarative">
                <button
                    disabled={dispableNext}
                    onClick={handleNext}
                    className="bg-blue mr-5"
                    type="button"
                >
                    See More
                </button>
                <button
                    disabled={page === 1}
                    onClick={handlePrevious}
                    className="bg-blue"
                    type="button"
                >
                    See Less
                </button>
            </span>
        </div>
    );
};

export default PaginationControls