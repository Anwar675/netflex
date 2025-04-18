import React, { useCallback, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavorateButton";
import useInforModal from "@/hooks/useInforModal";
import useMovie from "@/hooks/useMovie";
import handle from "@/pages/api/current";

interface InforModalProps {
  visible?: boolean;
  onClose: any;
}

const InforModal: React.FC<InforModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisble] = useState(!!visible);

  const { movieId } = useInforModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisble(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisble(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);
  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              poster={data?.thumbnailUrl}
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              src={data?.videoUrl}
            ></video>
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <IoIosCloseCircleOutline color="white" size={30} />
            </div>
            <div className="absolute bottom-[12%] left-9">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-0 ">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg ">New</p>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-lg">{data?.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InforModal;
