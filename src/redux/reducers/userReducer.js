import { LIST } from "../types/actions";

const intialState = {
  num: 1,
  searchParam: "",
};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case LIST.GET_MOVIE_LIST:
      return { ...state, movieList: action.payload };
    case LIST.UPDATE_FIELD:
      return { ...state, [action.field]: action.val };
    default:
      return state;
  }
};

export default userReducer;
