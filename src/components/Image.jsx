import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Image = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [image, setImage] = useState("");
  const [textContainerVisible, setTextContainerVisible] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null); // Ref for accessing file input

  const handelTitle = (e) => {
    setTitle(e.target.value);
  };
  const handelDescriptione = (e) => {
    setDescription(e.target.value);
  };
  const handleBrowseClick = () => {
    // Trigger click on file input when the button is clicked
    fileInputRef.current.click();
  };

  const handelImage = (e) => {
    setImage(e.target.files[0]);
    setTextContainerVisible(false);
  };
  ///upload image function

  const handleuploadImage = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ccm-uploads");
    data.append("cloudName", "djiy8bxgu");

    try {
      setLoading(true);

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djiy8bxgu/image/upload",
        data
      );
      console.log(response);

      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData.my_token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // assuming you are sending JSON data
      };

      const res = await axios.post(
        "http://localhost:5000/images",
        {
          title,
          description,
          name: response.data.original_filename,
          url: response.data.url,
          format: response.data.format,
        },
        { headers }
      );
      console.log(res);
      if (res.status === 200) {
        enqueueSnackbar("Image uploaded successfully");
        return navigate("/");
      } else {
        return navigate("/error");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className=" flex justify-center items-center w-full h-screen bg-[#2F80EC] ">
        <main className=" p-2 bg-[#FFFFFF] h-[70vh] w-[60%] rounded-xl flex gap-[2rem] ">
          <div className="left w-[50%] flex flex-col justify-center items-center  border-black gap-[1rem]  ">
            {image && (
              <img
                className="w-[300px] h-[auto] "
                src={URL.createObjectURL(image)}
                alt=""
              />
            )}
            {/* Button to trigger file input */}
            {textContainerVisible && (
              <div className="textContainer flex justify-center items-center flex-col  ">
                <FaFileUpload size={100} />
                <h1>Drag and Drop a file </h1>
                <h1>or</h1>

                <button
                  className="uploadSeclectBtn "
                  type="button"
                  onClick={handleBrowseClick} // Click event to trigger file input
                >
                  Browse
                </button>
              </div>
            )}
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handelImage}
              ref={fileInputRef} // Ref assigned here
              style={{ display: "none" }} // Hide the file input
            />

            {image && (
              <button
                className="uploadSeclectBtn "
                type="button"
                onClick={handleBrowseClick}
              >
                Change file
              </button>
            )}
          </div>
          <div className="rignt w-[50%]  p-6  gap-[2rem] border-black text-black justify-center  flex  flex-col">
            <h1 className="info text-center">Image information</h1>

            <form action="" className="desform">
              <div>
                <label>Title</label>
                <input type="text" value={title} onChange={handelTitle} />
              </div>
              <div>
                <label>Description</label>
                <textarea value={description} onChange={handelDescriptione} />
              </div>
              <button
                className="uploadSeclectBtn"
                type="submit"
                onClick={handleuploadImage}
                style={{ width: "100%" }}
              >
                UploadFile
                {loading && <div className="loader"></div>}
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Image;
