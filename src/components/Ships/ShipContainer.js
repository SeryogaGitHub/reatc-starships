import React from "react";
import Ship from "./Ship";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getProfile} from "../../redux/shipsReducer";

class ShipContainer extends React.Component{
  componentDidMount() {
    const {getProfile} = this.props;
    let {userId} = this.props.match.params;

    getProfile(userId);
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

export default connect(mapStateToProps, {getProfile})(ShipContainerWithRouter);
