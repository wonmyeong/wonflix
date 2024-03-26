import React from "react";
import { useUpcomingMovies } from "../../../hooks/useUpcomingMovies";
import { Alert } from "react-bootstrap";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMovies();
  console.log("uuu", data);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider
        title="Upcoming Movies"
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpcomingMovieSlide;
