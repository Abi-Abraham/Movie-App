import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { updateField } from "../redux/actions/userActions";
import SetImage from "./SetImage";

const MovieList = ({ list, updateField, apiNum, searchParam }) => {
  const [movieList, setmovieList] = useState([]);
  const [screenList, setScreenList] = useState([]);
  const [posterImgName, setPosterImgName] = useState("poster-image");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching && apiNum <= 3) {
      updateField("num", apiNum + 1);
    }
  }, [isFetching]);

  useEffect(() => {
    if (list?.movieList?.page?.title) {
      const {
        movieList: { page },
      } = list;
      const contentItem = "content-items";
      if (
        JSON.stringify(movieList) !== JSON.stringify(page[contentItem].content)
      ) {
        setmovieList([...movieList, ...page[contentItem].content]);
        setIsFetching(false);
      }
    }
  }, [list && list?.movieList]);

  useEffect(() => {
    setScreenList(movieList);
  }, [movieList]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchParam !== "") {
        const searchResult = movieList?.filter((item) =>
          item.name.toLowerCase().includes(searchParam.toLowerCase().trim())
        );
        setScreenList(searchResult);
      } else {
        setScreenList(movieList);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchParam, movieList]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {screenList.length ? (
        <div className="main">
          {screenList?.map((movie, idx) => {
            return (
              <div className="movie-card" key={idx}>
                <SetImage imgUrl={`img/${movie[posterImgName]}`} />
                <h6>{movie.name}</h6>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 style={{ width: "100%", paddingTop: "194px", textAlign: "center" }}>
          No data found
        </h1>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  list: state.user,
  apiNum: state.user.num,
  searchParam: state.user.searchParam,
});

const mapDispatchToProps = {
  updateField,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
