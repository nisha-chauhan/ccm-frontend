const ImageCard = ({ url, title, description }) => {
  return (
    <div className="p-2 rounded-xl shadow-xl flex  flex-col justify-center ">
      <img className="w-full h-[200px] rounded-lg " src={url} alt="" />
      <div className="text-lg font-bold"> Title:{title} </div>
      <div>Description: {description} </div>
    </div>
  );
};

export default ImageCard;
