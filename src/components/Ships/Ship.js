import React from "react";
import Preloader from "../common/Preloader";

const Ship = (props) => {
  const {profile, isFetching} = props;

  if (!props.profile){
    return <Preloader/>;
  }
  return(
    <div className={"ship-page"}>
      {isFetching ? <Preloader/> : null}

      <h2>{profile.name}</h2>

      <ul>
        <li>Model: {profile.model}</li>
        <li>Length: {profile.length}</li>
        <li>Consumables: {profile.consumables}</li>
      </ul>
    </div>
  )
};

export default Ship;
