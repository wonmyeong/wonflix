import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
const Pagination = () => {
  

let active = 2;
let items = [];

}
  return (
    <div>
      for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
    </div>
  )
}

export default Pagination
