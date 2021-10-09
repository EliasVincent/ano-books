import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Book from './components/Book';
import EditBook from './components/EditBook';

export const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};
export const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.5
};

ReactDOM.render(
  <React.StrictMode>
    <AnimatePresence>
    <Router>
      <Route exact path="/" component={App} />
      <Route exact path="/404" component={() => <h1>404 oopsie :(</h1>} />
      <Route exact path="/book/:id" render={props => <Book {...props} />} />
      <Route exact path="/book/:id/edit" render={props => <EditBook {...props} />} />
    </Router>
    </AnimatePresence>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
