import React from 'react';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 1,
    }

    this.change = this.change.bind(this);
  }
  change(e) {
    let val = e.target.value;
    this.setState({sort: val});
    this.props.sortEpisodes(val);
  }
  render() {
    let {sortEpisodes} = this.props; 
    return (
      <select 
        onChange={this.change}
        value={this.state.sort}
        className="form-control"
      >
          <option value="1">Default</option>
          <option value="2">Name</option>
          <option value="3">Rating</option>
      </select>
    );
  }
};

Sort.propTypes = {
  sortEpisodes: React.PropTypes.func.isRequired,
};
export default Sort;