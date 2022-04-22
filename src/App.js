import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import MyNav from "./components/Nav";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <MyNav />
        <MovieList />
      </div>
    </Provider>
  );
};

export default App;
