import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const ReviewMoreInfo = ({ reviewData }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="review-text">
        <h5>{reviewData?.author}</h5>
        <p>
          <p>{reviewData.split(".").slice(0, 2).join(".")}</p>
        </p>
        <Collapse in={open}>
          <p id="hidden-review">{reviewData.split(".").slice(2).join(".")}</p>
        </Collapse>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          {open === false ? "더보기" : "접기"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewMoreInfo;
