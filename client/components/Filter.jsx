import React from 'react';
import {Col, Button} from 'react-bootstrap';

const Filter = (props) => {
  let btns = [
                <div key={1} >
                  <Button 
                    bsStyle="default">
                    ALL
                  </Button>
                </div>
              ];
  let firstLetter = {}
   props.titles.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
   });
  props.titles.forEach((val) => {
    let firstChar = val[0];
    firstLetter[firstChar] = 0;
  });

  for (let keys in firstLetter) {
    btns.push (
      <div key={btns.length + 1} >
        <Button  
          bsStyle="default">
          {keys}
        </Button>  
      </div>
    );
  }
  return (
    <Col xs={1} sm={1} md={1} lg={1}>
      {btns}
    </Col>
  );
}

Filter.propTypes = {
  titles: React.PropTypes.array.isRequired,
};
export default Filter;

