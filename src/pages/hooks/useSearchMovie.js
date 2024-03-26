import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
//키워드가 있으면 search 없으면 popular 보여주기
const fetchSearchMovie = ({ keyword }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}`)
    : api.get("/movie/popular");
};

export const useSearchMovieQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ["movie-search", keyword],
    queryFn: () => fetchSearchMovie({ keyword }),
    select: (result) => result.data,
  });
};
