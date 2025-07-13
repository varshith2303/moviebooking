import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header/>
        <div className='container flex-grow' style={{minHeight:"70vH"}}>
        <Outlet></Outlet>
        </div>
        <Footer className=''/>
    </div>
  )
}

export default RootLayout