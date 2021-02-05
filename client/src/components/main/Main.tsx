import React from 'react';
import Home from './Home';
import NavBar from '../navigation/navbar';
import Testimony from './Testimony';
import Service from './Service';
import Membership from './Membership';

export default function Main() {
    return (
          <>
            <NavBar></NavBar>
            <Home></Home>
            <Service></Service>
            <Testimony></Testimony>
            <Membership></Membership>
          </>
    );
}