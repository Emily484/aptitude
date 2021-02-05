import './App.css';
import React, { useEffect } from 'react';
import RouterComponent from './components/navigation/routing.component';
import userService from './services/user.service';
import {useDispatch} from 'react-redux';
import { getUser } from './actions/actions';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    userService.getLogin().then((user) => {
        dispatch(getUser(user));
    })
}, [dispatch]);

  return (
    <div className="container">
      <RouterComponent></RouterComponent>
    </div>
  );
}

export default App;
