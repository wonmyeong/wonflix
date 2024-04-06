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
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import { useMovieVideoQuery } from "../hooks/useMovieVideo";
import Youtube from "./components/Youtube";
import Yellow from "../../common/badges/Yellow";

const MovieDetail = () => {
  let { id } = useParams();
  const [review, setReview] = useState(true);
  const [show, setShow] = useState(false);

  const { data, isLoading, isError, error } = useMovieDetail({ id });
  const { data: reviewData } = useMovieReviewQuery({ id });
  const { data: videoData } = useMovieVideoQuery({ id });

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  const handleReview = () => {
    setReview(!review);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(videoData);
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
                  <Badge bg="danger">{genre?.name}</Badge>
                ))}
              </div>
              <div className="movie_vote">
                <Yellow inner={"인기"} />
                {Math.ceil(data?.vote_average)}
              </div>
              <div className="movie_popularity">
                <Yellow inner={"투표수"} />
                {Math.ceil(data?.popularity)}
              </div>
              <div className="line"></div>
              <div className="movie-overview">{data?.overview}</div>

              <div className="line"></div>
              <div className="detail">
                <div className="release-date">
                  개봉일 : {data?.release_date}
                </div>
                <div className="runtime">Running Time : {data?.runtime}분</div>
                <div className="revenue">수익 : USD {data?.revenue} </div>
              </div>
              <Button variant="primary" onClick={handleShow}>
                예고편
              </Button>

              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>예고편</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Youtube id={videoData?.results[0].key} />
                </Modal.Body>
              </Modal>
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
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetail;
