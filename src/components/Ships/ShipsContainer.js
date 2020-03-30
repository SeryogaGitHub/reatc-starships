import React from "react";
import {connect} from "react-redux";
import {setShips, setCurrentPage, setTotalCount, searchShips, setIsFetching} from "../../redux/shipsReducer";
import Ships from "./Ships";
import axios from 'axios';
import {withRouter} from "react-router-dom";

class ShipsContainer extends React.Component {
  componentDidMount() {
    const {setShips, setTotalCount, setIsFetching} = this.props;
    setIsFetching(true);

    axios.get(`https://swapi.co/api/starships/`)
      .then(response => {
        setShips(response.data.results);
        setTotalCount(response.data.count);
        setIsFetching(false);
      });
  }

  onChangePages = (page) => {
    const {setShips, setCurrentPage, setIsFetching} = this.props;
    setCurrentPage(page);
    setIsFetching(true);

    axios.get(`https://swapi.co/api/starships/?page=${page}`)
      .then(response => {
        setShips(response.data.results);
        setIsFetching(false);
      });
  };

  onSearch = (text) => {
    const {searchShips, setIsFetching, setTotalCount, currentPage} = this.props;
    if(text.length){
      setIsFetching(true);

      axios.get(`https://swapi.co/api/starships/?search=${text}`)
        .then(response => {
          searchShips(response.data.results);
          setTotalCount(response.data.count);
          this.props.history.push(`?search=${text}&page=${currentPage}`);
          setIsFetching(false);
        });
    } else{
      this.props.history.push(`/`);
      setIsFetching(true);

      axios.get(`https://swapi.co/api/starships/`)
        .then(response => {
          setShips(response.data.results);
          setTotalCount(response.data.count);
          setIsFetching(false);
        });
    }
  };

  render(){
    const {ships, isFetching, setCurrentPage, totalCount, pageSize, currentPage} = this.props;
    return (<>
      <Ships ships={ships}
                  setCurrentPage={setCurrentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChangePages={this.onChangePages}
                  onSearch={this.onSearch}
                  isFetching={isFetching}
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
    isFetching: state.shipsPage.isFetching
  }
};

let ShipsContainerWithRouter = withRouter(ShipsContainer);
export default connect(mapStateToProps, {setShips, setCurrentPage, setTotalCount, searchShips, setIsFetching})(ShipsContainerWithRouter);
