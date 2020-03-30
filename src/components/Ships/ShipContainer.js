import React from "react";
import Ship from "./Ship";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import axios from 'axios';
import {setIsFetching, setProfile} from "../../redux/shipsReducer";

class ShipContainer extends React.Component{
  componentDidMount() {
    const {setProfile, setIsFetching} = this.props;
    let {userId} = this.props.match.params;
    setIsFetching(true);

    axios.get('https://swapi.co/api/starships/'+userId)
      .then((response) => {
        setProfile(response.data);
        setIsFetching(false);
    });
  }

  render() {
    const {profile, isFetching} = this.props;
    return <Ship profile={profile} isFetching={isFetching}/>
  }
}

let mapStateToProps = (state) => {
  return{
    profile: state.shipsPage.profile,
    isFetching: state.shipsPage.isFetching
  };
};

let ShipContainerWithRouter = withRouter(ShipContainer);

export default connect(mapStateToProps, {setProfile, setIsFetching})(ShipContainerWithRouter);
