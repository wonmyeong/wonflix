import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchMovieGenre = ({ id }) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useRecommendation = ({ id }) => {
  return useQuery({
    queryKey: ["movie-recommendation", { id }],
    queryFn: () => fetchMovieGenre({ id }),
    select: (result) => result.data,
  });
};
