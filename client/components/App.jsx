import React from 'react';
import axios from 'axios';
import {ProgressBar, Row, Col} from 'react-bootstrap';
import Episode from './Episode';
import Filter from './Filter';
const URL = "http://www.omdbapi.com/?i=tt0092455&season=4&ref_=tt_eps_sn_4";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: null,
      title: "",
      season: "",
      filteredEpisodes: null,
    };
  }
  componentDidMount() {
    axios.get(URL)
    .then(({data})  => {
      let episodes = data["Episodes"].map((val) => {
        let obj = {};
        obj["Title"] = val["Title"];
        obj["imdbRating"] = Number(val["imdbRating"]);
        obj["imdbID"] = val["imdbID"];
        return obj;
      });

      this.setState({episodes, title: data["Title"], season: data["Season"]})
    })
    .catch((error) =>
      console.log(error)
    );
  }

  render() {
    let {episodes, title, season} = this.state;

    if (!episodes) {
      return (
        <div>
          <h3 className="text-center">Loading... </h3>
          <ProgressBar active now={100} />
        </div>
      );
    }

    let listEpisodes = episodes.map((val, index) =>
      <Col key={index + 1} xs={10} sm={6} md={4}>
        <Episode 
          id={val["imdbID"]}
          title={val["Title"]}
          rating={val["imdbRating"]}
        />
      </Col>
    );
    let titles = episodes.map((val) => val["Title"]);
    return (
      <div className="container">
        <h2 className="text-center">{title}</h2>
        <h4 className="text-center">Season: {season}</h4>
        <Row> 
          <Filter titles={titles}/>
          <Col xs={10} md={10}>
            {listEpisodes}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;