import axios from "axios";

const SET_SHIPS = "SET_SHIPS";
const SET_PROFILE = "SET_PROFILE";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const SEARCH_SHIPS = "SEARCH_SHIPS";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_SEARCH_TEXT = "SET_SEARCH_TEXT";

const initialState = {
  ships: [],
  pageSize: 10,
  totalCount: 0,
  currentPage: 1,
  searchText: null,
  isFetching: false,
  profile: null,
};

const shipsReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_SHIPS: {
      return {...state, ships: action.ships}
    }
    case SET_CURRENT_PAGE: {
      return {...state, currentPage: action.page};
    }
    case SET_TOTAL_COUNT: {
      return {...state, totalCount: action.count};
    }
    case SET_PROFILE: {
      return {...state, profile: action.profile};
    }
    case SEARCH_SHIPS: {
      return {...state, ships: action.ships}
    }
    case SET_IS_FETCHING: {
      return {...state, isFetching: action.fetching}
    }
    case SET_SEARCH_TEXT: {
      return {...state, searchText: action.search}
    }
    default:
      return state;
  }
};

export const setShips = (ships) => ({type: SET_SHIPS, ships});
export const searchShips = (ships) => ({type: SEARCH_SHIPS, ships});
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setTotalCount = (count) => ({type: SET_TOTAL_COUNT, count});
export const setProfile = (profile) => ({type: SET_PROFILE, profile});
export const setIsFetching = (fetching) => ({type: SET_IS_FETCHING, fetching});
export const setSearchText = (search) => ({type: SET_SEARCH_TEXT, search});

export const getProfile = (userId) => {
  return (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setSearchText(""));

    axios.get('https://swapi.co/api/starships/'+userId)
      .then((response) => {
        dispatch(setProfile(response.data));
        dispatch(setIsFetching(false));
      });
  }
};

export const getShipsSearch = (text, page) => {
  return (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setSearchText(text));
    dispatch(setCurrentPage(page));

    axios.get(`https://swapi.co/api/starships/?search=${text}&page=${page}`)
      .then(response => {
        dispatch(searchShips(response.data.results));
        dispatch(setTotalCount(response.data.count));
        dispatch(setIsFetching(false));
      });
  }
};

export const getShips = (page) => {
  return (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));

    axios.get(`https://swapi.co/api/starships/?page=${page}`)
      .then(response => {
        dispatch(setShips(response.data.results));
        dispatch(setTotalCount(response.data.count));
        dispatch(setIsFetching(false));
      });
  }
};


export default shipsReducer;
