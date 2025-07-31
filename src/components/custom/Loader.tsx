import { SquareLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/30 z-10 flex items-center justify-center">
      <SquareLoader color="#007cc4" size={50} speedMultiplier={1.5} />
    </div>
  );
};

export default Loader;
