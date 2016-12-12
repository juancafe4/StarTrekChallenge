import React from 'react';
import axios from 'axios';
import { ProgressBar, Row, Col } from 'react-bootstrap';
import Episode from './Episode';
import Filter from './Filter';
import Sort from './Sort';

const URL = 'http://www.omdbapi.com/?i=tt0092455&season=4&ref_=tt_eps_sn_4';

class App extends React.Component {
  constructor(props) {
    super(props);

    // There are a total of 5 states.
    // title => title of the TV show.
    // season => season of the TV show.
    // episodes => array of objects number of episodes
    // defaultEpisodes => array of objects it backs up the original
    // list of episodes. When the user clicks default, episodes are assigned by defaultEpisodes
    // and restore to their original order.
    // filteredEpisodes => the number of episodes that are filtered by first letter.
    // defaultFilteredEpisodes => same as defaultEpisodes but for filtered episodes
    this.state = {
      defaultEpisodes: null,
      episodes: null,
      title: '',
      season: '',
      filteredEpisodes: null,
      defaultFilteredEpisodes: null,
    };

    this.filter = this.filter.bind(this);
    this.sortEpisodes = this.sortEpisodes.bind(this);
  }

  componentDidMount() {
    // After the component is rendered, get the 
    // data and change the state to display the episodes
    axios.get(URL)
    .then(({ data }) => {
      const episodes = data.Episodes.map((val) => {
        //
        const obj = {};
        obj.Title = val.Title;
        obj.imdbRating = Number(val.imdbRating);
        obj.imdbID = val.imdbID;
        return obj;
      });

      this.setState({ episodes,
        defaultEpisodes: [...episodes],
        title: data.Title,
        season: data.Season });
    })
    .catch(error =>
      console.log(error),
    );
  }

  // This function filter episodes by first letter title.
  filter(char) {
    const { episodes, defaultEpisodes } = this.state;

    // filteredEpisodes is set to null if the user 
    // wants to see all the episodes
    if (char === 'ALL') {
      this.setState({ filteredEpisodes: null, defaultFilteredEpisodes: null });
    } else {
      const defaultFilteredEpisodes = defaultEpisodes.filter(ep =>
        char === ep.Title[0].toUpperCase(),
      );
      const filteredEpisodes = episodes.filter(ep =>
        char === ep.Title[0].toUpperCase(),
      );
      this.setState({ filteredEpisodes, defaultFilteredEpisodes });
    }
  }
  sortEpisodes(ep) {
    // 1 Default
    // 2 Sort by name alphabetically
    // 3 Sort by rating highest to lowest

    const { defaultEpisodes, defaultFilteredEpisodes } = this.state;
    let { episodes, filteredEpisodes } = this.state;

    switch (ep) {
      case '1':
        episodes = [...defaultEpisodes];

        if (filteredEpisodes) {
          filteredEpisodes = [...defaultFilteredEpisodes];
        }
        break;
      case '2':
        episodes.sort((a, b) => {
          if (a.Title < b.Title) return -1;
          if (a.Title > b.Title) return 1;
          return 0;
        });

        if (filteredEpisodes) {
          filteredEpisodes.sort((a, b) => {
            if (a.Title < b.Title) return -1;
            if (a.Title > b.Title) return 1;
            return 0;
          });
        }
        break;
      case '3':
        episodes.sort((a, b) => {
          if (a.imdbRating < b.imdbRating) return 1;
          if (a.imdbRating > b.imdbRating) return -1;
          return 0;
        });
        if (filteredEpisodes) {
          filteredEpisodes.sort((a, b) => {
            if (a.imdbRating < b.imdbRating) return 1;
            if (a.imdbRating > b.imdbRating) return -1;
            return 0;
          });
        }
        break;
      default:
        break;
    }
    this.setState({ episodes, filteredEpisodes });
  }


  render() {
    const { episodes, title, season, filteredEpisodes } = this.state;

    if (!episodes) {
      // loading bar
      return (
        <div>
          <h3 className="text-center">Loading... </h3>
          <ProgressBar active now={100} />
        </div>
      );
    }

    const eps = filteredEpisodes || episodes;
    const listEpisodes = eps.map((val, index) =>
      <Col key={index + 1} xs={10} sm={6} md={4}>
        <Episode
          id={val.imdbID}
          title={val.Title}
          rating={val.imdbRating}
        />
      </Col>,
    );

    const titles = episodes.map(val => val.Title);
    return (
      <div className="container">
        <h2 className="text-center">{title}</h2>
        <h4 className="text-center">Season: {season}</h4>

        <Row>
          <Col xs={4}>
            <h4>Sort By: </h4>
            <Sort sortEpisodes={this.sortEpisodes} />
          </Col>
        </Row>
        <br />
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
