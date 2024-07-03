import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
const Search = ({ classname = "py-2" }) => {
  return (
    <div className="relative">
      <span className="absolute top-[62%] left-4 -translate-y-[83%]">
        <FcSearch />
      </span>
      <input type="text" id="search" name="search" placeholder="search" className={classname} />
      <span className="absolute top-[62%] -translate-y-[83%] right-5 text-blue-700">
        <BsThreeDotsVertical />
      </span>
    </div>
  );
};

export default Search;
