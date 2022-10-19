import React from 'react';
// import Button from '@mui/material/Button';
import './App.css';
import { Component } from 'react';
import Main from './components/MainComponent'
import { BrowserRouter } from 'react-router-dom';

class App extends Component{
  
  render(){
    return (
      <BrowserRouter>
       <div className='App'>
         <Main></Main>
       </div>
      </BrowserRouter>
    
  );
}
}

export default App;
