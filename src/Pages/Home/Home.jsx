import React from "react";
import HomeLeft from "../../Components/HomeComponents/HomeLeft/HomeLeft";
import HomeRight from "../../Components/HomeComponents/HomeRight/HomeRight";

const Home = () => {
  return (
    <>
      <div className="bg-blue-100 h-screen p-5 flex gap-x-10 ">
        <HomeLeft />
        <HomeRight />
      </div>
    </>
  );
};

export default Home;
