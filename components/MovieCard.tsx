import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaP } from "react-icons/fa6";
import { useRouter } from "next/router";
import FavoriteButton from "./FavorateButton";
import useInforModal from "@/hooks/useInforModal";
import { IoChevronDown } from "react-icons/io5";
interface MovieCradProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCradProps> = ({ data }) => {
  const {openModal} = useInforModal()

  const router = useRouter()
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={data.thumbnailUrl}
        className="h-full w-full object-cover cursor-pointer transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
        alt="Thumnail"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:translate-y-[-6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
          src={data.thumbnailUrl}
          alt=""
        />

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full shadow-md rounded-b-md">
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center  ">
              <div
                className="cursor-pointer w-6 h-6  lg:w-10 lg:h-10 bg-white rounded-full  flex justify-center items-center transition hover:bg-neutral-300"
                onClick={() => router.push(`/watch/${data?.id}`)}
              >
                <FaPlay size={21} />
              </div>
              <FavoriteButton movieId={data?.id}/>
              <div onClick={() => openModal(data?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"><IoChevronDown className="text-white group-hover/item:text-neutral-300" size={20}/></div>
            </div>
            <p className="text-green-400  font-semibold ">
              New <span className="text-white">2025</span>
            </p>
            <div className=" flex flex-col">
              <p className="text-white text-[10px] lg:text-sm">
                {data.duration}
              </p>
            </div>
            <div className=" flex flex-col">
              <p className="text-white text-[10px] lg:text-sm">
                {data.gener}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
