import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorite";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
interface FavorateButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavorateButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favorieIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    
    let response;
    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }

    const updateFavoriteIds = response?.data?.favorieIds;

    mutate({
      ...currentUser,
      favorieIds: updateFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? FaCheck : FaPlus;
  return (
    <div
      onClick={toggleFavorites}
      className="ml-3 cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon size={20} color="white" />
    </div>
  );
};

export default FavoriteButton;
