import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import DashBoard from './components/Dashboard';
import NavBar from './components/NavBar';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Admin from './components/Admin';

const URI = "http://localhost:3000/";

export {URI};

function App() {

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const [token, setToken] = useState(getToken());
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  }

  const logOut = () =>{
    localStorage.removeItem('token');
    setToken('');
  }

  useEffect(() => {
    const islogged = async() => {
        const req = await fetch(URI+'islogged',{
            method: 'GET',
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
        })
        if(req.status === 201)
            setIsAdmin(true);

        if(req.status === 401){
            logOut();
        }
    }
    if(token)
      islogged();
  }, [token])


  return (
    <div className="App">
    {
      token?
      <NavBar token={token} logOut={logOut} isAdmin={isAdmin}/>
      :
      <NavBar token={token} isAdmin={isAdmin}/>
    }
      <Router>
        <Switch>
          <Route path="/" exact component={DashBoard}/>
          <Route path="/login" component={() => <Login setToken={handleLogin}/>}/>
          {
            isAdmin ? <Route path="/admin" component={Admin}/>
            : <Route component={NotFound}></Route>
          }
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
