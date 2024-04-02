import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
//키워드가 있으면 search 없으면 popular 보여주기
const fetchSearchMovie = ({ keyword, page, popular }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page, popular }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page, popular }],
    queryFn: () => fetchSearchMovie({ keyword, page, popular }),
    select: (result) => result.data,
  });
};
