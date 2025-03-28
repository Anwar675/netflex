import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import PlayButton from "./PlayButton";
import useInforModal from "@/hooks/useInforModal";

const BillBoard = () => {
  const { data } = useBillboard();
  const {openModal} = useInforModal()
  const handleOpenModal = useCallback(() => {
    openModal(data?.id)
  },[openModal, data?.id])
  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full sm:h-[52.25vw] h-[70vw]  object-cover brightness-[70%]"
        autoPlay
        muted
        loop
        poster={data?.thumnailUrl}
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[50%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-3xl md:text-4xl h-full w-[70%] lg:text-5xl  font-bold drop-shadow-xl ">
          {data?.title}
        </p>
        <p className="text-white text-md md:text-lg w-[100%] mt-3 md:mt-8 md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id}/>
          <button onClick={handleOpenModal} className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-5 md:px-5 text-xs lg:text-lg font-semibold flex flex-row  items-center hover:bg-opacity-40 transition">
            <IoIosInformationCircleOutline className="mr-1"/>
            More Infor
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
