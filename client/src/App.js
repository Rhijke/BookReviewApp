import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Booklist from './components/Booklist';
import WriteReview from './components/WriteReview';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Logout() {
  window.open('http://localhost:3002/logout');
}
function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/booklist" exact component={Booklist} />
          <Route path="/writereview" exact component={WriteReview} />
          <Route path="/search/:search" exact component={SearchResults} />
          <Route path="/details/:book" component={BookDetails} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
