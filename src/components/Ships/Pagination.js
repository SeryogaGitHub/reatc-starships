import React, {useState} from 'react';

let Pagination = (props) => {
  const {pageSize, totalCount, currentPage, onChangePages, portionSize = 3} = props;

  const activePage = 'active';

  let pageCount = Math.ceil(totalCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  let pointCount = Math.ceil(pageCount / portionSize);
  let [pointNumber, setPointNumber] = useState(1);
  let leftPortionNumber = (pointNumber - 1) * portionSize +1;
  let rightPortionNumber = pointNumber * portionSize;

  return (
    <ul className="pagination">
      {pointNumber > 1 &&
      <button className="arrow" onClick={() => {setPointNumber(pointNumber - 1)}}>&larr;</button>}

      {pages
        .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
        .map((p, i) => {
        return <li key={i} className={currentPage === p ? activePage : ""}
                   onClick={() => {
                     onChangePages(p);
                   }}>{p}</li>;
      })}

      {pointCount > pointNumber &&
      <button className="arrow" onClick={() => {setPointNumber(pointNumber + 1)}}>&rarr;</button>}
    </ul>
  );
};
export default Pagination;
