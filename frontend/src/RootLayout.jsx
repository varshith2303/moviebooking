import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function RootLayout() {
  return (
    <div>
        <Header/>
        <div className='container' style={{minHeight:"70vH"}}>
        <Outlet></Outlet>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout