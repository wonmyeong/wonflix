import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { Alert } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Badge, Button } from "react-bootstrap";
import "./MovieDetail.style.css";
import { useMovieReviewQuery } from "../hooks/useMovieReview";
import ReviewMoreInfo from "./ReviewMoreInfo";
import RecommendedSlide from "./components/RecommendedSlide/RecommendedSlide";
const MovieDetail = () => {
  let { id } = useParams();
  const [review, setReview] = useState(true);

  const { data, isLoading, isError, error } = useMovieDetail({ id });
  const { data: reviewData } = useMovieReviewQuery({ id });

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  const handleReview = () => {
    setReview(!review);
  };

  // const handleRecommended = () => {
  //   console.log("reco");
  // };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data?.poster_path}`}
            />
          </Col>
          <Col>
            <div className="main-detail">
              <h1>{data?.title}</h1>
              <div>{data?.tagline}</div>
              <div className="genre-tags">
                {data?.genres.map((genre) => (
                  <Badge bg="danger">{genre.name}</Badge>
                ))}
              </div>
              <div className="movie_vote">{Math.ceil(data?.vote_average)}</div>
              <div className="movie_popularity">
                {Math.ceil(data?.popularity)}
              </div>
              <div className="line"></div>
              <div>{data?.overview}</div>

              <div className="line"></div>
              <div className="detail">
                <div className="release-date">{data?.release_date}</div>
                <div className="runtime">{data?.runtime}분</div>
                <div className="revenue">USD {data?.revenue} </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <div className="review-box">
            <Button variant="outline-primary" onClick={handleReview}>
              Review
            </Button>
            <Button variant="outline-primary" onClick={handleReview}>
              Recommendation
            </Button>
            {review ? (
              <ReviewMoreInfo reviewData={reviewData} />
            ) : (
              <RecommendedSlide />
            )}
            {/* <ReviewMoreInfo reviewData={reviewData} />
            <RecommendedSlide /> */}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
