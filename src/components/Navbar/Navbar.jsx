import React, { useState } from "react";
import logo from "../image/logo.png";

import { useDispatch, useSelector } from "react-redux";
import { sidebar } from "../../features/createslice/userSlice";

const Navbar = (props) => {
  const [dark, setdark] = useState(false);
  const { toggleMode, darkMode } = props;

  const value = useSelector((state) => state.toggle.sidebar);
  const dispatch = useDispatch();

  function toggleMenu() {
    dispatch(sidebar());
  }

  return (
    <>
      <nav
        className={`bg-white w-full min-h-[45px] md:h-[55px] shadow-lg dark:text-white dark:bg-slate-900 flex flex-wrap justify-between items-center `}
      >
        <div className="flex gap-2 md:gap-5 items-center">
          <img
            src={logo}
            alt="...loading"
            className="w-7 h-7 ml-4 md:w-10 md:h-10 md:ml-9"
          />
          <p className="text-xl font-bold"> Note Manager</p>
        </div>
      </nav>
    </>
  );
};

export default React.memo(Navbar);
