import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import person from "../image/person-removebg-preview.png";
import { sidebar } from "../../features/createslice/userSlice";
import moment from "moment";

const Sidebar = () => {
    const [userDetails, setuserDetails] = useState([]);
    const [FullDetail, setFullDetail] = useState(false);
    const navigate = useNavigate();
    const temp = useSelector((state) => state.toggle.userinfo);
    const dispatch = useDispatch();
    const location = useLocation();

    const deleteToken = () => {
        localStorage.removeItem("jwtToken");
        navigate("/");
        toast.success("Logged Out seccessfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        dispatch(sidebar());
    };
    const closeSidebar = () => {
        dispatch(sidebar());
    };

    useEffect(() => {
        if (temp) {
            setuserDetails(temp);
        }
    }, [temp]);

    return (
        <>
            <div
                className={`lg:w-[80%] md:w-[90%] w-[100%] h-screen md:h-auto md:mx-auto mt-10 shadow-md sticky bg-white dark:bg-slate-900 dark:text-white  rounded-lg border-none scroll-m-5`}
            >
               
                <div
                    className={`flex flex-col  items-center ${FullDetail
                            ? "h-[200px] transition-all ease-linear duration-150"
                            : "h-[137px] transition-all ease-linear duration-150 overflow-hidden"
                        } py-4  g-2  text-xl border-b-2 `}
                >
                    <div className="bg-orange-400 p-6 border-none rounded-[50%] text-xl font-bold">
                        {temp !== undefined && temp.length !== 0 ? (
                            <p>
                                {temp?.firstname[0]?.toUpperCase()}
                                {temp?.lastname[0]?.toUpperCase()}
                            </p>
                        ) : (
                            <p>undefined</p>
                        )}
                    </div>
                    <div className="mt-2 text-center ">
                        <p className=" font-semibold text-center">
                            {userDetails?.firstname}&nbsp;{userDetails?.lastname}{" "}
                        </p>
                        <span
                            className="float-right mt-[-24px] cursor-pointer"
                            onClick={() => {
                                setFullDetail(!FullDetail);
                            }}
                        >
                            {FullDetail ? (
                                <ion-icon name="arrow-up-circle-outline"></ion-icon>
                            ) : (
                                <ion-icon name="chevron-down-circle-outline"></ion-icon>
                            )}
                        </span>
                        <p className="mt-1">{userDetails?.email}</p>
                        <p className="mt-1 mb-1">
                            {" "}
                            Created At-{moment(userDetails.createdAt).format("YYYY-MM-DD")}
                        </p>
                    </div>
                </div>

                <div className="border-b-2">
                    <ul className="flex flex-col mt-2 md:mx-2 mx-2 ">
                        <li
                            className={`   transition duration-300 ease-out hover:translate-x-1 hover:ease-in text-2xl font-semibold ${location.pathname === "/home"
                                    ? "text-red-400 border-l-4 border-r-4 rounded-lg border-red-500 "
                                    : ""
                                }`}
                        >
                            <Link
                                to="/home"
                                className="flex gap-4 p-4 md:gap-4  md:p-5 mx-2 md:mx-4"
                                onClick={closeSidebar}
                            >
                                <ion-icon name="home-outline"></ion-icon>Home
                            </Link>
                        </li>
                        <li
                            className={`   transition duration-300 ease-out hover:translate-x-1 hover:ease-in text-2xl font-semibold ${location.pathname === "/ArchiveNote"
                                    ? "text-red-400 border-l-4 border-r-4 rounded-lg border-red-500"
                                    : ""
                                }`}
                        >
                            <Link
                                to="/ArchiveNote"
                                className="flex gap-4 p-4 md:gap-4  md:p-5 mx-2 md:mx-4"
                                onClick={closeSidebar}
                            >
                                <ion-icon name="archive-outline"></ion-icon>Archive
                            </Link>
                        </li>
                        <li
                            className={`   transition duration-300 ease-out hover:translate-x-1 hover:ease-in text-2xl font-semibold ${location.pathname === "/favoriteNote"
                                    ? "text-red-400 border-l-4 border-r-4 border-b-2 border-t-2 rounded-lg border-red-500"
                                    : ""
                                }`}
                        >
                            <Link
                                to="/favoriteNote"
                                className="flex gap-4 p-4 md:gap-4  md:p-5 mx-2 md:mx-4"
                                onClick={closeSidebar}
                            >
                                <ion-icon name="star-outline"></ion-icon>Favorite
                            </Link>
                        </li>
                        <li
                            className={`   transition duration-300 ease-out hover:translate-x-1 hover:ease-in text-2xl font-semibold ${location.pathname === "/TrashNote"
                                    ? "text-red-400 border-l-4 border-r-4 rounded-lg border-red-500"
                                    : ""
                                }`}
                        >
                            <Link
                                to="/TrashNote"
                                className="flex gap-4 p-4 md:gap-4  md:p-5 mx-2 md:mx-4"
                                onClick={closeSidebar}
                            >
                                <ion-icon name="trash-outline"></ion-icon>Trash
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="my-4">
                    <div className="flex gap-3 justify-center items-center  py-3 my-6 text-2xl border-none bg-blue-400 hover:bg-blue-500 rounded-lg mx-auto w-[180px] ">
                        <button className="" onClick={deleteToken}>
                            Logout{" "}
                        </button>
                        <ion-icon name="log-out-outline"></ion-icon>
                    </div>
                   
                </div>
                <div className="mt-2">
                    <img src={person} alt="loading.." className="w-[350px] h-[200px] " />
                </div>
            </div>
        </>
    );
};

export default React.memo(Sidebar);
