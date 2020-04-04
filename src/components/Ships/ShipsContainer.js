import React from "react";
import {connect} from "react-redux";
import {
  searchShips,
  getShips,
  getShipsSearch,
  setSearchText
} from "../../redux/shipsReducer";
import Ships from "./Ships";
import {withRouter} from "react-router-dom";

class ShipsContainer extends React.Component {
  componentDidMount() {
    const {getShips, currentPage, getShipsSearch} = this.props;

    let {search, page} = this.props.match.params;
    if(search && page){
      getShipsSearch(search, Number(page));
    } else {
      getShips(currentPage);
    }

  }

  onChangePages = (page) => {
    const {getShips, searchText, getShipsSearch} = this.props;

    if(searchText && page){
      getShipsSearch(searchText, page);
      this.props.history.push(`/search=${searchText}&page=${page}`);
    } else {
      getShips(page);
    }
  };

  onSearch = (text) => {
    const {getShipsSearch, currentPage, getShips, setSearchText} = this.props;

    if(text.length){
      getShipsSearch(text, 1);
      this.props.history.push(`/search=${text}&page=${1}`);
    } else{
      this.props.history.push(`/`);
      getShips(currentPage);
      setSearchText(null);
    }
  };

  render(){
    const {ships, isFetching, setCurrentPage, totalCount, pageSize, currentPage, searchText} = this.props;
    return (<>
      <Ships ships={ships}
                  setCurrentPage={setCurrentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePages={this.onChangePages}
                  onSearch={this.onSearch}
                  isFetching={isFetching}
                  searchText={searchText}
    />
    </>)
  };
};

const mapStateToProps = (state) => {
  return{
    ships: state.shipsPage.ships,
    pageSize: state.shipsPage.pageSize,
    currentPage: state.shipsPage.currentPage,
    totalCount: state.shipsPage.totalCount,
    searchText: state.shipsPage.searchText,
    isFetching: state.shipsPage.isFetching
  }
};

let ShipsContainerWithRouter = withRouter(ShipsContainer);

export default connect(mapStateToProps, {searchShips, getShips, getShipsSearch, setSearchText})(ShipsContainerWithRouter);
