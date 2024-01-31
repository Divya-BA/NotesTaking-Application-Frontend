import React, { useState, useRef, useEffect } from "react";
import { useAddNoteMutation } from "../../features/api/apiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import NotesData from "../HOC/NotesData";
import write from "../image/write-removebg-preview.png";
import { FiEdit } from "react-icons/fi";
import { FaBold, FaUnderline } from "react-icons/fa";
import { RxFontItalic } from "react-icons/rx";
import moment from "moment";

const Head = () => {
  const [Note, setNote] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Deadline, setDeadline] = useState(new Date()); // Initialize with current date
  const [Status, setStatus] = useState("Pending");
  const titleContentEditableRef = useRef(null);
  const descriptionContentEditableRef = useRef(null);

  const [addNote] = useAddNoteMutation();
  const UserId = useSelector((state) => state.toggle.userid);

  const handleToggleStyle = (style) => {
    document.execCommand(style, false, null);
  };

  const handleBoldClick = () => {
    handleToggleStyle("bold");
  };

  const handleItalicClick = () => {
    handleToggleStyle("italic");
  };

  const handleUnderlineClick = () => {
    handleToggleStyle("underline");
  };

  const setInnerText = (ref, content) => {
    if (ref.current) {
      ref.current.textContent = content;
    }
  };

  const AddNote = () => {
    if (!Title || !Description || !Deadline) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    addNote({
      _id: UserId,
      title: Title,
      isFav: false,
      isArchive: false,
      isTrash: false,
      description: Description,
      deadline: moment(Deadline).toISOString(), // Format date to ISO format
      status: Status, 
    });

    toast.success("Notes Added Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setNote(false);
    setTitle("");
    setDescription("");
    setDeadline(new Date()); // Reset date to current date
  };

  useEffect(() => {
    setInnerText(titleContentEditableRef, Title);
  }, [Title]);

  useEffect(() => {
    setInnerText(descriptionContentEditableRef, Description);
  }, [Description]);

  return (
    <>
      <div className="w-[95%] mx-auto p-6 mt-8 md:mt-10 bg-white dark:bg-slate-900 dark:text-white rounded-lg relative">
        <div className="absolute right-4 top-0">
          <img src={write} alt="loading..." className="w-[100px] h-[80px]" />
        </div>

        <div
          className={`mr-2 md:ml-5 hover:font-semibold ${
            Note
              ? "h-[370px] animate-slide-down"
              : "h-[30px] overflow-hidden animate-slide-up"
          } `}
        >
          <button
            href="/"
            className="flex gap-4 items-center text-xl "
            onClick={() => setNote(!Note)}
          >
            <FiEdit />
            write a note
          </button>
          <div className="my-5 w-[80%]">
            <div
              ref={titleContentEditableRef}
              className="w-[100%] py-2 outline-none text-xl font-semibold rounded-lg text-black bg-white font-light"
              placeholder="Title"
              contentEditable={true}
              onInput={(e) => {
                setTitle(e.currentTarget.textContent);
              }}
            />
          </div>
          <div className="my-5 w-[80%]">
            <div
              ref={descriptionContentEditableRef}
              placeholder="Description"
              className="w-[100%] py-2 h-[5rem] overflow-scroll  overflow-x-hidden  outline-none text-xl font-semibold rounded-lg text-black bg-white font-light"
              contentEditable={true}
              onInput={(e) => {
                setDescription(e.currentTarget.textContent);
              }}
            />
          </div>

          <div className="my-5 w-[80%]">
            <input
              type="date"
              className="py-2 px-3 border border-gray-300 text-black rounded-md"
              value={moment(Deadline).format("YYYY-MM-DD")}
              onChange={(e) => setDeadline(new Date(e.target.value))}
            />
          </div>
          <div className="my-5 w-[80%]">
        <select
          className="py-2 px-3 border border-gray-300 text-black rounded-md"
          value={Status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">In-progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

          <div className="flex items-center gap-4 justify-end ">
            <button
              className="border-2 border-white hover:bg-black hover:text-white py-2 px-3 rounded-md"
              onClick={handleBoldClick}
            >
              <FaBold />
            </button>
            <button
              className="border-2 border-white hover:bg-black hover:text-white py-2 px-3 rounded-md"
              onClick={handleItalicClick}
            >
              <RxFontItalic />
            </button>
            <button
              className="border-2 border-white hover:bg-black hover:text-white py-2 px-3 rounded-md"
              onClick={handleUnderlineClick}
            >
              <FaUnderline />
            </button>

            <button
              className="border-2 border-black hover:bg-black hover:text-white py-2 px-3 rounded-md"
              onClick={AddNote}
            >
              Add
            </button>
            <button
              className="border-1 py-2 px-3 rounded-md bg-slate-800 text-white hover:bg-black"
              onClick={() => setNote(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesData(Head);
