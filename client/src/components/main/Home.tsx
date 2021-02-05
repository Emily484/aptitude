import userService from '../../services/user.service';
import {useDispatch, useSelector} from 'react-redux';
import { getUser } from '../../actions/actions';
import React, {useEffect} from 'react';
import './home.css'
import { Link } from 'react-router-dom';
import LoginComponent from '../users/login.component';
import { UserState } from '../../reducers/reducer';

function Home() {
  const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    userService.getLogin().then((user) => {
        dispatch(getUser(user));
    })
}, [dispatch]);

  return (
    <>
      <div 
        className='home-section'>
          <div className="home-container">
            <div className="home-row">
              <div className="header-col">
                <div className="home-text-wrapper">
                  <h1 className='heading'>Providing you with personalized education and career guidance</h1>
                  <Link to="/sign-up">
                    <button className='btn btn-info'>Sign Up Today</button>
                  </Link>
                </div>
              </div>
              <div className="login-col">
                <div className="home-comp-wrapper">
                  {user.role ? (null) :(
                  <LoginComponent></LoginComponent>)}
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Home;