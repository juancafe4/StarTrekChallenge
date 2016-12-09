import React from 'react';
import axios from 'axios';

const URL = "http://www.omdbapi.com/?i=tt0092455&season=4&ref_=tt_eps_sn_4";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: []
    };
  }
  componentDidMount() {
    axios.get(URL)
    .then(({data})  => {
      let episodes = data["Episodes"].map(val => {
        let obj = {};
        obj["Title"] = val["Title"];
        obj["imdbRating"] = val["imdbRating"];
        obj["imdbID"] = val["imdbID"];
        return obj;
      });

      this.setState({episodes})
    })
    .catch((error) =>
      console.log(error)
    );
  }

  render() {
    let {episodes} = this.state;
    let lis = []
    lis = episodes.map((val, index) =>
      <li key={index + 1}>
        <h3>{val.Title}</h3>
        <h4>{val.imdbRating}</h4>
      </li>
    );
    return (
      <ul>
        {lis}
      </ul>
    );
  }
}

export default App;