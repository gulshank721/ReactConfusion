import React, { Component } from 'react';
import {Route , useParams} from 'react-router-dom';
import { Routes, Navigate} from "react-router-dom";
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Favorites from './FavoriteComponent';
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutComponent';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { fetchDishes } from '../redux/dishes';
import { fetchComments } from '../redux/comments';
import { postComments } from '../redux/comments';
import { fetchPromotions } from '../redux/promotions';
import {fetchLeaders} from '../redux/leaders';
import { fetchFavorites } from '../redux/favorites';
import { postFavorites } from '../redux/favorites';
import { deleteFavorites } from '../redux/favorites';
import { loginUser } from '../redux/auth';
import { logoutUser } from '../redux/auth';
import { baseUrl } from '../shared/baseUrl';

import { actions } from 'react-redux-form';
import { Loading } from './LoadingComponent';
// import leaders from '../redux/leaders';
import { dishLoading } from '../redux/dishes';
import { commentLoading } from '../redux/comments';
import SignUp from './SignUp/SignUpComponent';


function Main(){
   
    // const isLoading =useSelector((state)=>state.dishes.isLoading)
    const dishes = useSelector((state) => state.dishes)
    const comments = useSelector((state) => state.comments)
    const promotions = useSelector((state) => state.promotions)
    const leaders = useSelector((state) => state.leaders)
    const favorites = useSelector((state)=> state.favorites)
    const auth = useSelector((state)=> state.auth)
  // below code was for redux thunk
  const dispatch = useDispatch();
 
  useEffect(() => {
    
     dispatch(fetchDishes());
     dispatch(fetchComments());
     dispatch(fetchPromotions());
     dispatch(fetchLeaders());
     if(auth.isAuthenticated)
      dispatch(fetchFavorites());
  }, []); 
  //  passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  const resetFeedbackForm = () => {dispatch(actions.reset('feedback'))};
   const HomePage = () => {
    // const dishes = useSelector((state) => state.dishes.dishes)
    const dish = dishes.dishes.filter((dish)=>dish.featured)[0];
    const promotion =promotions.promotions.filter((promo) => promo.featured)[0];
    const leader =leaders.leaders.filter((leader) => leader.featured)[0];
    const leaderErrMess =leaders.errMess;
    console.log('hi Homepage in Main',dishes,promotions,leaders);
    console.log('hi Homepage in Mainbb',dish,promotion,leader);
    console.log('hi Homepage in Mainbb',dishes.errMess,promotions.isLoading,leaderErrMess);

    return(
        <Home 
      
        dish={dish}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        promotion={promotion}
        promotionsLoading={promotions.isLoading}
        promotionsErrMess={promotions.errMess}
        leader={leader}
        leadersLoading={leaders.isLoading}
        leadersErrMess={leaders.errMess}
    />
    );
  }
      const DishWithId = () => {
        // alert(dishes.isLoading,comments.isLoading);
        console.log(dishes.isLoading,comments.isLoading);
        //
     
        
        const  {dishId}  = useParams();
        console.log('id checking',dishId,parseInt(dishId),dishId);
        const dish = dishes.dishes.filter((dish)=> dish._id === dishId)[0];
        const commentse=comments.comments.filter((comment) => comment.dishId === dishId);
        var isfav =false;
        console.log("In DishWithId",comments,dishes,favorites.favorites);
        if(favorites.favorites!=null){
           isfav = favorites.favorites.dishes.some((dish) => dish._id === dishId);
        }
          
        console.log('isfav ',isfav);
        // const favorits = favorites.favorites
        console.log("In DishWithId",comments,dishes,favorites.favorites);
        
        // console.log("ffibb ",commentse,dish,'dishId=',dishId,'dish._id=',dish._id);
        return(
          auth.isAuthenticated
          ?
            <DishDetail dish={dish} 
              isLoading={comments.isLoading}
              errMess={comments.errMess}
              comments={commentse} 
              favorite={isfav}
               postFavorite={postFavorites}
              />  
              :
            <DishDetail dish={dish} 
              isLoading={dishes.isLoading}
              errMess={dishes.errMess}
              comments={commentse} 
              // commentsErrMess={comments.errMess}
              favorite={false}
              postFavorite={postFavorites}
          />
        );
      
      
     
        
      
        
      };
      //check
      const Checkfetches = () => {
        console.log('checkin',dishes);
        const dish = dishes.dishes.filter((dish)=>dish.featured)[0];
        return(

          
          <div className="App">
            {/* <h1>{dish.name}</h1> */}
          { dishes.dishes.map((dish)=>{
            
             return(
               <div key={dish.id} className='container mt-4'>
                
                 <img src={baseUrl+dish.image}></img>
                             <h2>{dish.name}</h2>
                             <p>{dish.description}</p>
               </div>
               
             )
           })}
         </div>
        );
      };
      //check ends
      
      // const PrivateRoute = ({ element: Component, ...rest }) => (
      //   <Route {...rest} render={(props) => (
      //     auth.isAuthenticated
      //       ? <Component {...props} />
      //       : <Route to={{
      //           pathname: '/home',
      //           state: { from: props.location }
      //         }} />
      //   )} />
      // );
      const PrivateRoute = ({children }) => {
        console.log('PrivateRoute',auth.isAuthenticated);
        if(auth.isAuthenticated){
          dispatch(fetchFavorites)
        }
        console.log('PrivateRoute favfetched',favorites);
        return auth.isAuthenticated ? 
        children : <Navigate to="/home" />;
      };

      //use conditional rendering
      if( dishes.isLoading === true   ){
        return(
           <Loading></Loading>
        )
        
      }
      else
      if(dishes.isLoading!==true && comments.isLoading!==true && promotions.isLoading!== true && leaders.isLoading!== true){
        return (
        
          <div>
            {/* <Checkfetches /> */}
           {console.log('checkin',dishes)}
            <Routes>
              <Route  path="/" element={<Header auth={auth} 
                                                loginUser={(creds)=>dispatch(loginUser(creds))} 
                                                logoutUser={() =>dispatch(logoutUser())} />}>
                 <Route index path='/home' element={<HomePage/>}/>
                 <Route exact path='menu' element={<Menu />} />
                 <Route path='/menu/:dishId' element={<DishWithId/>} />
                 <Route path="/favorites" element={<PrivateRoute> <Favorites/> </PrivateRoute>}/>
                 {/* <PrivateRoute exact path="/favorites" element={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} /> */}
                 <Route  path='aboutus'  element={<AboutUs/>}/>
                 <Route  path='contactus'element={<ContactUs resetFeedbackForm={resetFeedbackForm} />}/>
                 <Route path = 'signup' element ={<SignUp/>} />
                 <Route path="*" to='home'/>
              </Route>
            </Routes>
           
            <Footer/>
          </div>
        );
    
      }
     
     
    }
    //for react-redux-from
    //  const resetFeedbackForm = () => {dispatch(actions.reset('feedback'))};
    
    

export default Main;