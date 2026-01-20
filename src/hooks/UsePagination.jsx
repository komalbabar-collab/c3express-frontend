import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';

function UsePagination() {
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default number of items per page
  const [Pages, setPages] = useState(null);

  const gotoPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setPageNumber(1); // Reset to the first page when changing items per page
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPageIndex = Math.max(1, pageNumber - halfMaxVisiblePages);
    let endPageIndex = Math.min(numberOfPages, pageNumber + halfMaxVisiblePages);

    if (endPageIndex - startPageIndex < maxVisiblePages - 1) {
      if (startPageIndex === 1) {
        endPageIndex = Math.min(numberOfPages, startPageIndex + maxVisiblePages - 1);
      } else {
        startPageIndex = Math.max(1, endPageIndex - maxVisiblePages + 1);
      }
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  };
  const pageComponent = () => (
    <>


      {numberOfPages > 0 && (
        <>
          <Form.Group controlId="itemsPerPageSelect">
            <Form.Label>Per page:</Form.Label>
            <Form.Control as="select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>
          <Pagination>
            <Pagination.Prev onClick={gotoPrevious} disabled={pageNumber === 1} />
            {getVisiblePages().map((page) => (
              <Pagination.Item
                style={{ background: "#2ca2c6" }}
                key={page}
                active={pageNumber === page}
                onClick={() => setPageNumber(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={gotoNext} disabled={pageNumber === numberOfPages} />
          </Pagination>
        </>
      )}
    </>
  );



  return {
    pageComponent,
    setNumberOfPages,
    pageNumber,
    Pages,
    itemsPerPage
  };
}

export default UsePagination;
