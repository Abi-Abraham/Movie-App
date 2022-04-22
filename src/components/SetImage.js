import React, { useState, useEffect } from "react";
import loader from "../assets/images/placeholder_for_missing_posters.png";

const SetImage = ({ imgUrl }) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    setImage(imgUrl);
  }, [imgUrl]);

  return (
    <>
      <img src={image} onError={() => setImage(loader)} alt="Movie poster" />
    </>
  );
};

export default SetImage;
