import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Booklist from './components/Booklist';
import WriteReview from './components/WriteReview';
import SearchResults from './components/SearchResults';
import BookDetails from './components/BookDetails';
import firebase from './components/api/firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav loggedIn={firebase.auth().currentUser} />
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/booklist" exact component={Booklist} />
          <Route path="/writereview" exact component={WriteReview} />
          <Route path="/search/:search" exact component={SearchResults} />
          <Route path="/details/:book" component={BookDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
