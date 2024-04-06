import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../hooks/useSearchMovie";
import { Container, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import MovieCard from "../../common/movieCard/MovieCard";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import { useMovieGenreQuery } from "../hooks/useMovieGenre";

//경로 2가지
//navbar에서 클릭 => popularMovie 보여주기
//키워드 입력
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState([]);

  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  const { data: GenreNameList } = useMovieGenreQuery();

  useEffect(() => {
    setMovieData(data?.results);
    console.log("changed", data);
  }, [data]);

  console.log("ddd", data?.results);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleSort = () => {
    setMovieData(
      [...data?.results].sort((a, b) => b.popularity - a.popularity)
    );
  };

  const handleGenre = (id) => {
    const filteredMovies = data?.results.filter((movie) =>
      movie.genre_ids.includes(parseInt(id))
    );
    setMovieData(filteredMovies);

    console.log("selectedId", id);
  };

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              variant="Secondary"
              id="dropdown-basic"
              style={{ fontSize: "30px" }}
            >
              Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleSort}>인기순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown data-bs-theme="dark">
            <Dropdown.Toggle
              variant="Secondary"
              id="dropdown-basic"
              style={{ fontSize: "30px" }}
            >
              Genre
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {GenreNameList?.map((genreName) => (
                <Dropdown.Item
                  id={genreName.id}
                  onClick={(event) => {
                    handleGenre(event.target.id);
                  }}
                  style={{ fontSize: "20px" }}
                >
                  {genreName.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {movieData?.map((movie, index) => (
              <Col key={index} lg={6} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={data?.total_pages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={page - 1}
        />
      </Row>
    </Container>
  );
};

export default MoviePage;
