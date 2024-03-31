import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const fetchMovieRecommendation = ({ id }) => {
  console.log(id.id);
  return api.get(`/movie/${id.id}/recommendations`);
};

export const useRecommendation = ({ id }) => {
  return useQuery({
    queryKey: ["movie-recommendation", { id }],
    queryFn: () => fetchMovieRecommendation({ id }),
    select: (result) => result.data,
  });
};
