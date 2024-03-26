import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../hooks/useSearchMovie";
import { Container, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import MovieCard from "../../common/movieCard/MovieCard";

//경로 2가지
//navbar에서 클릭 => popularMovie 보여주기
//키워드 입력
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  console.log("kkk", keyword);

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
  console.log("ddd", data);
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Row>
        <Col lg={6} xs={12}>
          필터
        </Col>
        <Col lg={6} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={6} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
