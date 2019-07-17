import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Booklist from './components/Booklist';
import WriteReview from './components/WriteReview';
import SearchResults from './components/SearchResults';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/booklist" component={Booklist} />
          <Route path="/writereview" component={WriteReview} />
          <Route path="/search/:search" component={SearchResults} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
