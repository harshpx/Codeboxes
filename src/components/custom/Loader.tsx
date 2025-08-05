import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-black/30 z-20 flex items-center justify-center">
      {/* <SquareLoader color="#007cc4" size={50} speedMultiplier={1.5} /> */}
      <div className="bg-gradient-to-b from-cyan-500 to-purple-500 bg-clip-text">
        <LoaderIcon className="animate-spin duration-100 transition-all w-32 h-32 text-purple-500" />
      </div>
    </div>
  );
};

export default Loader;
