import React from "react";
import { useRecommendation } from "../../../hooks/useRecommendation";
import { useParams } from "react-router-dom";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const RecommendedSlide = () => {
  let id = useParams();
  const { data: recommendedData } = useRecommendation({ id });
  console.log("rec", recommendedData);
  return (
    <div>
      <MovieSlider
        title="Recommendation"
        movies={recommendedData?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default RecommendedSlide;
