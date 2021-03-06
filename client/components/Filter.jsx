import React from 'react';
import { Col, Button } from 'react-bootstrap';

// This component filters out the episode by first letter
const Filter = ({ titles, filter }) => {
  const btns = [
    <div key={1} >
      <Button
        bsStyle="default"
        value="ALL"
        onClick={e => filter(e.target.value)}
      >
        ALL
      </Button>
    </div>,
  ];
  const firstLetter = {};
  titles.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  titles.forEach((val) => {
    const firstChar = val[0].toUpperCase();
    firstLetter[firstChar] = 0;
  });

  Object.keys(firstLetter).forEach((letter) => {
    btns.push(
      <div key={btns.length + 1} >
        <Button
          bsStyle="default"
          value={letter}
          onClick={e => filter(e.target.value)}
        >
          {letter}
        </Button>
      </div>,
    );
  });
  return (
    <Col xs={1} sm={1} md={1} lg={1}>
      {btns}
    </Col>
  );
};

Filter.propTypes = {
  titles: React.PropTypes.array.isRequired,
  filter: React.PropTypes.func.isRequired,
};
export default Filter;
