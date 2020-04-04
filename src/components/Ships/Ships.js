import React from "react";
import Pagination from "./Pagination";
import {NavLink} from "react-router-dom";
import Preloader from "../common/Preloader";

const Ships = (props) => {
  const {ships, currentPage, searchText, totalCount, pageSize, onSearch, onChangePages, isFetching} = props;

  let setIdProfile = (url) => {
    return Number(url.replace(/\D+/g,""))
  };

  let setShips = ships.map((ship, i) =>
    <NavLink key={i} to={'/starship/' + setIdProfile(ship.url)} className={'ship'}>
      <h2>{ship.name}</h2>

      <ul>
        <li>Model: {ship.model}</li>
        <li>Length: {ship.length}</li>
        <li>Consumables: {ship.consumables}</li>
      </ul>
    </NavLink>
  );

  return(
    <div className={"ships-page"}>
      <input type="search"
             value={searchText ? searchText : ""}
             className={"search"}
             placeholder={"Search"}
             onChange={(e)=> onSearch(e.target.value)}
             autoFocus={true}/>

      <Pagination currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onChangePages={onChangePages}/>

      <div className={'ships-list'}>
        {isFetching ? <Preloader/> : null}

        {setShips}
      </div>
    </div>
  )
};

export default Ships;
