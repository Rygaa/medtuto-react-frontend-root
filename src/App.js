import './App.css';
import Layout from './layout/Layout';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkIdToken } from './store/User/user-actions'
import { userActions } from './store/User/user-slice'
import MyAccount from './pages/Authenticated/MyAccount';
import Root__ from './pages/Authenticated/Root__';
import Login from 'pages/notAuthenticated/Login';


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
        <Route path="/medical" exact>
          <Root__></Root__>
        </Route>
        <Route path="/user" exact>
        </Route>
        <Route path="/myaccount" exact>
          <MyAccount></MyAccount>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
