import React from 'react';
import axios from 'axios';
const URL = "http://www.omdbapi.com/?i=";

class Episode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLink: null,
    };
  }
  componentDidMount() {
    axios.get
  }
  render() {
    return (

    );
  }
}


export default Episode;