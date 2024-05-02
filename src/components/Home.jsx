// import img from "../assets/Shiva-Wallpaper-adiyogi-112ft-v3.jpg";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [allImages, setAllImages] = useState([]);

  ///pagination--------------------------------->
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);

  // const imagesPerPage = 6;

  // const indexOfLastImage = currentPage * imagesPerPage;
  // const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  // const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage);

  // const handleNextbtn = async () => {
  //   setCurrentPage(currentPage + 1);
  // };
  // const handlePreBtn = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const showBtn = (direction) => {
  //   if (direction === "next") {
  //     return currentPage !== totalPage;
  //   } else if (direction === "pre") {
  //     return currentPage !== 1;
  //   }
  // };

  // --------------------------------------------------->

  const fetchImages = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData?.my_token) {
      enqueueSnackbar("you need to login");
      return;
    }
    const token = userData.my_token;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", //if user is loged in we will get the token in application headers
    };

    const res = await axios.get(
      "http://localhost:5000/images",
      { params: { limit: 3, page: currentPage } },
      { headers }
    );
    if (res.status === 200) {
      setAllImages(res.data.all_images);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [currentPage]);

  return (
    <>
      <Header />
      <div className="home grid grid-cols-3 w-full p-4 gap-[2rem] ">
        {allImages.map((image) => (
          <ImageCard
            url={image.url}
            title={image.title}
            description={image.description}
            key={image._id}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-[1rem]   ">
        <button
          className="bg-[red] rounded p-2 cursor-pointer "
          style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          value={currentPage}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Pre
        </button>
        <h1>{currentPage}</h1>
        <button
          className="bg-[green] rounded p-2   cursor-pointer "
          style={{ opacity: allImages.length < 3 ? 0.5 : 1 }}
          value={currentPage}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={allImages.length < 3}
        >
          Next
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Home;
