import React from 'react';
import axios from 'axios';
import {Thumbnail, Button, ProgressBar} from 'react-bootstrap';

const URL = "http://www.omdbapi.com/?i=";

class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLink: null,
      id: '',
    };
  }
  componentDidMount() {
    let { id } = this.props
    axios.get(URL + id)
      .then(({ data })  => {
        this.setState({ imageLink: data["Poster"], id});
      })
      .catch((err) => 
        console.log(err)
    );
  }
  componentWillReceiveProps(props) {
    let { id } = props
    
    if (id !== this.state.id) {
      axios.get(URL + id)
        .then(({ data })  => {
          this.setState({ imageLink: data["Poster"], id});
        })
        .catch((err) => 
          console.log(err)
      );
    }
  }
  render() {
    let {imageLink} = this.state;
    let { title, rating } = this.props;

    if (!imageLink) {
      return (
        <ProgressBar active now={50} />
      );
    }

    return (
      <Thumbnail src={imageLink}>
        <h5>{title}</h5>
        <p>⭐{rating}/10</p>
        <p>
          <Button bsStyle="success">More Details</Button>
        </p>
      </Thumbnail>
    );
  }
}

Episode.propTypes = {
  title: React.PropTypes.string,
  rating: React.PropTypes.number,
  id: React.PropTypes.string,
};
export default Episode;
