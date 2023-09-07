import React from "react";
import CategoryMenu from "../components/CategoryMenu";
import Donate from "../components/Donate";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <Donate />
    </div>
  );
};

export default Home;
