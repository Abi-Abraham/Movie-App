import { LIST } from "../types/actions";
import fetchHandler from "../../utils/fetchHandler";

export const getMovieList = (num) => {
  const fetchOptions = {
    url: `API/CONTENTLISTINGPAGE-PAGE${num}.json`,
    method: "GET",
    actionType: LIST.GET_MOVIE_LIST,
  };

  return fetchHandler(fetchOptions);
};

export const updateField = (field, val) => {
  return {
    type: LIST.UPDATE_FIELD,
    field,
    val,
  };
};
