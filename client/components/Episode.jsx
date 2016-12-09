import React from 'react';
import axios from 'axios';
import {Thumbnail, Button, ProgressBar} from 'react-bootstrap';

const URL = "http://www.omdbapi.com/?i=";

class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLink: null,
    };
  }
  componentDidMount() {
    let { id } = this.props
    axios.get(URL + id)
      .then(({ data })  => {
        this.setState({ imageLink: data["Poster"] });
      })
      .catch((err) => 
        console.log(err)
    );
  }
  render() {
    let imageLink = this.state;
    let { title, rating } = this.props;

    if (!imageLink) {
      return (
        <ProgressBar active now={50} />
      );
    }
    return (
      <Thumbnail src={ imageLink }>
        <h3>{ Title }</h3>
        <p>{Rating}</p>
        <p>
          <Button bsStyle="success">More Details</Button>
        </p>
      </Thumbnail>
    );
  }
}

Episode.propTypes = {
  title: React.PropTypes.string.isRequired,
  rating: React.PropTypes.number.isRequired,
  id: React.PropTypes.string.isRequired,
};
export default Episode;