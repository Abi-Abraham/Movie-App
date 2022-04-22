import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import back from "../assets/images/Back.png";
import search from "../assets/images/search.png";
import { getMovieList, updateField } from "../redux/actions/userActions";

const MyNav = ({ list, getMovieList, apiNum, searchParam, updateField }) => {
  const [title, setTitle] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (apiNum <= 3) {
      async function fetchData() {
        await getMovieList(apiNum);
      }
      fetchData();
    }
  }, [apiNum]);

  useEffect(() => {
    if (list?.movieList?.page?.title) {
      const {
        movieList: {
          page: { title },
        },
      } = list;
      setTitle(title);
    }
  }, [list]);

  const searchHandler = (e) => {
    updateField("searchParam", e.target.value);
  };

  return (
    <div className="my-nav">
      <div className="back-icon">
        <img src={back} alt="back" />
        <h3>{title ? title : "Loading..."}</h3>
      </div>
      <div className="search-icon">
        {isSearch ? (
          <Form.Control
            type="text"
            onChange={(e) => searchHandler(e)}
            placeholder="Search..."
          />
        ) : (
          <img
            src={search}
            alt="search"
            onClick={() => {
              setIsSearch(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.user,
  apiNum: state.user.num,
  searchParam: state.user.searchParam,
});

const mapDispatchToProps = {
  getMovieList,
  updateField,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNav);
