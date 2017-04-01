import React, { Component } from 'react';
import history from './utils/history';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Books from './Books';
import NavHeader from './NavHeader';
import Logout from './Logout';
import Login from './Login';

import { getAllBooks, getMyBooks, addBook, deleteBook, tradeBook } from './models/booksModel';

import AuthService from './utils/AuthService';
const auth = new AuthService('dBLJpCZvLmQEoD0uoXmRMTby8F2b7ju1', 'tchaffee.auth0.com');

const NotFound = () => (
  <h1>404.. Page does not exist.</h1>
);

const NotAuthorized = () => (
  <h3>Oops, you are not authorized to do that. Your login probably expired, so please try logging in again.</h3>
);

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      redirectPath: false
    };

  }

  render () {

    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (
        React.createElement(component, finalProps)
      );
    }

    const PrivateRoute = ({ component, ...rest }) => {
      return (
        <Route {...rest} render={routeProps => {
          return auth.loggedIn() ? (
            renderMergedProps(component, routeProps, rest)
          ) : (
            <Redirect to={{
              pathname: '/',
              state: { from: routeProps.location }
            }}/>
          );
        }}/>
      );
    };

 //          <PrivateRoute path='/mybooks' component={Books} booksGetter={getMyBooks} />


    return (
      <Router history={history}>
        <div className="App">
          <NavHeader auth={auth} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/login' render={routeProps => <Login {...routeProps} auth={auth} authenticatedRedirect="/" />} />
            <PrivateRoute 
              path='/allbooks' 
              component={Books} 
              booksGetter={getAllBooks} 
              tradeBook={tradeBook}
              user={auth.getProfile()} 
            />
            <PrivateRoute 
              path='/mybooks' 
              component={Books} 
              booksGetter={getMyBooks} 
              addBook={addBook} 
              deleteBook={deleteBook} 
              user={auth.getProfile()} 
            />
            <PrivateRoute path='/logout' component={Logout} auth={auth} redirectPath="/" />
            <Route path='/notauthorized' component={NotAuthorized} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
