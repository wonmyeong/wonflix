import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

const ReviewMoreInfo = ({ reviewData }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="review-box">
      <h2>Review</h2>
      {reviewData?.map((review, index) => (
        <div className="review-text" key={index}>
          <h5>{review?.author}</h5>
          <p>{review?.content.split(".").slice(0, 2).join(".")}</p>
          <Collapse in={openIndex === index}>
            <p id={`hidden-review-${index}`}>
              {review?.content.split(".").slice(2).join(".")}
            </p>
          </Collapse>
          <Button
            onClick={() => handleToggle(index)}
            aria-controls={`hidden-review-${index}`}
            aria-expanded={openIndex === index}
          >
            {openIndex === index ? "접기" : "더보기"}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ReviewMoreInfo;
