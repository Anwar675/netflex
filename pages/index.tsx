import BillBoard from "@/components/Billboard";
import InforModal from "@/components/InforModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorite";
import useInforModal from "@/hooks/useInforModal";
import useMoviesList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Home() {

  const { data: movies = [] } = useMoviesList();
  const {data: favorites = []} = useFavorites();
  const {isOpen, closeModal} = useInforModal()
  return (
    <div>
      <InforModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="trending now" data={movies} />
        <MovieList title="My list" data={favorites} />
      </div>
    </div>
  );
}
