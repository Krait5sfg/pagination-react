import React from 'react';
import './pagination.css';

const Pagination = ({toDoItemsPerPage, totalToDoItem, onPaginationLinkClick, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalToDoItem / toDoItemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pageNumbersElements = pageNumbers.length > 1 ?
    pageNumbers.map((number) => {
      return <li key={number} className="pagination__item">
        <a href="/" className={currentPage === number ? `pagination__link pagination__link--active` : `pagination__link`} onClick={onPaginationLinkClick}>{number}</a>
      </li>
    }) :
    [];

  return (
    <ul className="pagination">
      {pageNumbersElements}
    </ul >
  )
};

export default Pagination;