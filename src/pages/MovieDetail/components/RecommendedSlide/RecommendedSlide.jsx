import React from "react";
import { useRecommendationQuery } from "../../../hooks/useRecommendationQuery";
import { useParams } from "react-router-dom";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { Alert } from "react-bootstrap";

const RecommendedSlide = () => {
  let { id } = useParams();
  const {
    data: recommendedData,
    isLoading,
    isError,
    error,
  } = useRecommendationQuery({ id });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  console.log("rrr", recommendedData);
  return (
    <div>
      <MovieSlider
        title="Recommendation"
        movies={recommendedData}
        responsive={responsive}
      />
    </div>
  );
};

export default RecommendedSlide;
