import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto"></div>
        {albumsData.map((item, index) => (
          <AlbumItem
            key={index}
            image={item.image}
            name={item.name}
            desc={item.desc}
            id={item.id}
          />
        ))}
      </div>
    </>
  );
};

export default DisplayHome;
