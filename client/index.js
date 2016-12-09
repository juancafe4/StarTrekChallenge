import React from 'react';
import ReactDOM, {render} from 'react-dom';

// Import the main component
import App from './components/App';
// Renders the App component into the root of our main html file: index.html
if (typeof document !== 'undefined') {
  render(<App />, document.getElementById('root'));
}