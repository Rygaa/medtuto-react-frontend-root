import './App.css';
import Layout from './layout/Layout';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkIdToken } from './store/User/user-actions'
import { userActions } from './store/User/user-slice'
import Root__ from './pages/Authenticated/Root__';
import Login from 'pages/notAuthenticated/Login';
import Members from 'pages/Authenticated/Members';


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

  if (isConnected == null) {
    return (<Layout>
      <div style={{fontSize:"25rem", textAlign:"center", color:"white"}}>WAITING</div>
    </Layout>)
  }


  return (
    <Layout>
      {isConnected &&
        <Switch>
          <Route path="/medical" exact>
            <Root__></Root__>
          </Route>
          <Route path="/user" exact>
            <Members />
          </Route>
        </Switch>

      }
      {!isConnected &&
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      }
    </Layout>
  );
}

export default App;
