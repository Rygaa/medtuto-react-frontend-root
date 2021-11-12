import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import Layout from './layout/Layout';
import { Route, Router, Switch } from 'react-router';
import Login from './pages/notAuthenticated/Login';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkIdToken } from './store/User/user-actions'
import { userActions } from './store/User/user-slice'
import MyAccount from './pages/Authenticated/MyAccount';
import Root__ from './pages/Authenticated/Root__';


function App() {
  const isConnected = useSelector((state) => state.user.isConnected)
  const idToken = localStorage.getItem('idToken');
  const dispatch = useDispatch();
  useEffect(() => {
    if (idToken && idToken != 'null') {
      dispatch(userActions.setIdToken(idToken));
      dispatch(checkIdToken({ idToken }))
    } else {
      dispatch(userActions.setIsConnected(false));
    }
    console.log(process.cwd());
  }, [])
  return (
    <Layout>
      <Switch>
        <Route path="/root" exact>
          <Root__></Root__>
        </Route>
        <Route path="/myaccount" exact>
          <MyAccount></MyAccount>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
