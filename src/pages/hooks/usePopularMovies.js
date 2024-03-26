import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchPopularMovies = () => {
  //endpoint 만 사용할 수 있다
  return api.get("/movie/popular");
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};
