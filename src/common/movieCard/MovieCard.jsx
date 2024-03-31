import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../pages/hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    //genreIdList는 그 영화의 고유 장르 번호이다
    //genreIdList에 id와 일치하는 값들을 모두 가져온 뒤 리스트 값으로 return 한다.
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  const navigate = useNavigate();

  const goToMovieDetail = () => {
    navigate(`/movies/${movie?.id}`);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w600_and_h600_bestv2${movie?.poster_path}` +
          ")",
      }}
      className="movie-card"
      onClick={goToMovieDetail}
    >
      <div className="overlay">
        <h1>{movie?.title}</h1>

        {showGenre(movie.genre_ids).map((id) => (
          <Badge bg="danger">{id}</Badge>
        ))}
        <div className="movie-detail">
          <div className="vote-avg">
            <FontAwesomeIcon icon={faHeart} />
            {movie?.vote_average}
          </div>
          <div className="popularity">
            <FontAwesomeIcon icon={faUser} />
            {Math.ceil(movie?.popularity)}
          </div>
          <div className={movie?.adult ? "adult" : "teens"}>
            {movie?.adult ? "over18" : "under18"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
