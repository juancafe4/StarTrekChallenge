import React from 'react';
import axios from 'axios';
import {ProgressBar, Row, Col} from 'react-bootstrap';
import Episode from './Episode';
import Filter from './Filter';
import Sort from './Sort';

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

    this.filter = this.filter.bind(this);
    this.sortEpisodes = this.sortEpisodes.bind(this);
  }
  filter(char) {
    let {episodes} = this.state;

    if (char === "ALL") {
      this.setState({filteredEpisodes: null})
    } else {
      let filteredEpisodes = episodes.filter((ep) =>
        char === ep["Title"][0].toUpperCase()
      );
      this.setState({filteredEpisodes})
    }
  }
  sortEpisodes(ep) {
    console.log("episode ", ep)
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
    let {episodes, title, season, filteredEpisodes} = this.state;

    if (!episodes) {
      return (
        <div>
          <h3 className="text-center">Loading... </h3>
          <ProgressBar active now={100} />
        </div>
      );
    }
    
    let eps = filteredEpisodes || episodes;
    let listEpisodes = eps.map((val, index) =>
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
          <Col xs={1}>
            
          </Col>
          <Col xs={4}>      
              <h4>Sort By: </h4> 
              <Sort sortEpisodes={this.sortEpisodes}/>
         </Col>
        </Row>
        <br/>
        <Row> 
          <Filter titles={titles} filter={this.filter} />
          <Col xs={10}>
            {listEpisodes}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;