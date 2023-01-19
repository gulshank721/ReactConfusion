import React from 'react';
// import Button from '@mui/material/Button';
import './App.css';
import { Component } from 'react';
import { useEffect } from 'react';
import { fetchDishes } from '../src/redux/dishes';
import { fetchComments } from '../src/redux/comments';
import { fetchPromotions } from '../src/redux/promotions';
// import { useDispatch } from 'react-redux';
import Main from './components/MainComponent'
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    return (
      <BrowserRouter>
       <div className='App'>
         <Main></Main>
       </div>
      </BrowserRouter>
    
  );

}

export default App;
