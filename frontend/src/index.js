import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Book from './components/Book';
import EditBook from './components/EditBook';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={App} />

      <Route exact path="/book/:id" render={props => <Book {...props} />} />
      <Route exact path="/book/:id/edit" render={props => <EditBook {...props} />} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
