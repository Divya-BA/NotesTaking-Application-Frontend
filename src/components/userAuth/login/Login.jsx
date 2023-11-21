import React from "react";
import note from "../../image/noteimg.jpg";
import logo from "../../image/bg34-1.png";
import paper from "../../image/8810413.jpg";
import Register from "../register/Register";
import { useDispatch, useSelector } from "react-redux";
import { loginToggle } from "../../../features/createslice/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../../features/api/apiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import ForgotPassword from "../forgotPassword/ForgotPassword";

const Login = () => {
  const [Show, setShow] = useState(false);
  const isActive = useSelector((state) => state.toggle.login);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      try {
        login(values).then((data) => {
          if (data?.data !== undefined) {
            localStorage.setItem("jwtToken", data.data.token);
            navigate("/home");
          } else {
            toast.success("Please Enter Valid Email and Password", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
      } catch {
        console.log("errror occured");
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email canot be left blank")
        .email("Invalid Email address"),
      password: Yup.string().required("Please enter password"),
    }),
  });
  const demoLogin = () => {
    const demo = {
        email: "linder010101@gmail.com",
        password: "12345"
    };
    login(demo).then((data) => {
        if (data?.data !== undefined) {
            localStorage.setItem('jwtToken', data.data.token);
            navigate('/home');

        } else {
            toast.success('Please Enter Valid Email and Password', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    })

}
  if (isLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <ScaleLoader color="blue" className="text-xl" />
      </div>
    );
  }
  return (
    <div className="h-screen w-full flex bg-cutom-white">
      <div className="lg:w-[50%] h-screen relative lg:block hidden">
        <img
          src={logo}
          alt="loading"
          className=" md:ml-0 mt-14 lg:ml-14 bg-no-repeat bg-contain animate-slide-right"
        />
        <div className="absolute top-[20%] left-10 flex flex-col">
          <div className="text-[40px] mb-4 font-bold inline-block bg-gradient-to-r from-red-600 via-yellow-500 to-pink-400 text-transparent bg-clip-text">
            Welcome to
          </div>
          <div className="text-[45px] relative top-[200px] left-[400px] font-bold inline-block bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
            Note Manager
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] w-full min-h-screen relative bg-black flex justify-center items-center">
        {isActive ? (
          <>
            <div className="lg:absolute  top-[20%] lg:left-[-13.7%] left-4 hidden lg:block ">
              <p
                className={`group px-5 py-2 text-xl mb-2 cursor-pointer  ${
                  isActive
                    ? "bg-black  text-white dark:text-black dark:bg-white border-none rounded-tl-[20px] rounded-bl-[20px]"
                    : "text-black dark:text-white"
                } focus:outline-none focus:ring focus:bg-blue-500 focus:border-blue-500`}
                onClick={() => dispatch(loginToggle(true))}
              >
                login
              </p>
              <p
                className={`group px-5 py-2 text-xl cursor-pointer  ${
                  !isActive
                    ? "bg-black text-white  dark:text-black dark:bg-white border-none rounded-tl-[20px] rounded-bl-[20px]"
                    : "text-black dark:text-white"
                } focus:outline-none focus:ring focus:bg-blue-500 focus:border-blue-500`}
                onClick={() => dispatch(loginToggle(false))}
              >
                sign up
              </p>
            </div>
            <div className="w-full animate-pop-up h-auto">
              <div>
                {" "}
                <img
                  src={note}
                  alt="..loading"
                  className="h-screen w-full bg-cover hidden md:block"
                />
                <img
                  src={paper}
                  alt="..loading"
                  className="h-screen w-full bg-cover md:hidden"
                />
              </div>
              <div className="sm:w-[450px]  w-[350px] h-auto absolute top-[17%] lg:top-[20%] sm:left-[25%]  left-5 border-2 border-opacity-50 border-white rounded-xl backdrop-blur-xl text-black bg-transparent md:text-white flex flex-col  ">
                <p className="mt-2 mb-4 text-[30px] text-center font-semibold">
                  LogIn
                </p>
                <form onSubmit={formik.handleSubmit}>
                  <div className=" w-[85%] mx-auto">
                    <p className="mb-2 text-xl">Email Address</p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="enter your email.."
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full rounded-xl h-[40px] outline-none text-black font-semibold px-2"
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <span className="text-red-600">
                        {formik.errors.email}
                      </span>
                    ) : null}
                  </div>
                  <div className="text-xl w-[85%] mx-auto mt-4">
                    <p className="mb-2">Password</p>
                    <div className="relative">
                      <input
                        type={`${Show ? "text" : "password"}`}
                        id="password"
                        name="password"
                        placeholder="enter your passsword"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full rounded-xl h-[40px] outline-none text-black font-semibold px-2 text-sm"
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <span className="text-red-600">
                          {formik.errors.password}
                        </span>
                      ) : null}
                      {Show ? (
                        <AiOutlineEye
                          className="absolute top-2 right-6 text-black  text-2xl cursor-pointer"
                          onClick={() => {
                            setShow(!Show);
                          }}
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          className="absolute top-2 right-6 text-black  text-2xl cursor-pointer"
                          onClick={() => {
                            setShow(!Show);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-[85%] mx-auto px-4 py-2 mt-6 rounded-lg text-center text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:border-2 hover:border-red-600 hover:rounded-xl">
                    <button>Login</button>
                  </div>

                  <div className="w-[85%] mx-auto px-4 py-2  mb-2 rounded-lg text-center text-xl   ">
                    <Link
                      to="/forgot-password"
                      className="text-gray-400 hover:text-orange-400"
                    >
                      Forgot Password!
                    </Link>
                    <div className="w-[85%] mx-auto px-4 py-2 mt-6 mb-3 rounded-lg text-center text-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:border-2 hover:border-red-600 hover:rounded-xl ">
                      <button type="button" onClick={demoLogin}>
                        Demo Login
                      </button>
                    </div>
                    <button type="button">
                      Dont Have Account?&nbsp;
                      <span
                        className="text-red-400 hover:text-orange-400"
                        onClick={() => dispatch(loginToggle(false))}
                      >
                        Signup
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <Register />
        )}
      </div>
    </div>
  );
};

export default Login;
