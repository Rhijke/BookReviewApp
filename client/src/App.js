import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Booklist from './components/Booklist';
import WriteReview from './components/WriteReview';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import BookDetails from './components/BookDetails';
import Logout from './components/Logout';
import Register from './components/Register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
          <Route path="/login" exact component={Login} />
          <Route path="/createaccount" exact component={Register} />
          <Route path="/logout" exact component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
