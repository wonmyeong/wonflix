import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchMovieRecommendation = ({ id }) => {
  console.log("iii", id);
  return api.get(`/movie/${id}/recommendations`);
};

export const useRecommendationQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-recommendation", { id }],
    queryFn: () => fetchMovieRecommendation({ id }),
    select: (result) => result.data.results,
  });
};
