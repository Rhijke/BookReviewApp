import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Booklist from './components/Booklist';
import WriteReview from './components/WriteReview';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import Login from './components/Login';
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
          <Route path="/search/:search" exact component={SearchResults} />
          <Route path="/details/:book" component={BookDetails} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
