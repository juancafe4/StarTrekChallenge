import React from 'react';
import axios from 'axios';
import Episode from './Episode';
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
      let episodes = data["Episodes"].map((val) => {
        let obj = {};
        obj["imdbID"] = val["Title"];
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
    
    let listEpisodes = episodes.map((val, index) =>
      <Episode 
        key={index + 1}
        id={val["imdbID"]}
        title={val["Title"]}
        rating={val["imdbRating"]}
      />
    );
    return (
      <ul>
        {listEpisodes}
      </ul>
    );
  }
}

export default App;