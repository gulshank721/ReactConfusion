import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import {DishDetail} from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import {Route , useParams} from 'react-router-dom';
import { Routes} from "react-router-dom";
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutComponent';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { fetchDishes } from '../redux/dishes';

import { actions } from 'react-redux-form';

function Main() {
  
 
  // below code was for redux thunk
  const dispatch = useDispatch()

  // useEffect(() => {
  //    dispatch(fetchDishes());
  //     console.log('mount it!');
  // }, []);
   // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    const dishes = useSelector((state) => state.dishes.dishes)
    const comments = useSelector((state) => state.comments.comments)
    const promotions = useSelector((state) => state.promotions.promotions)
    const leaders = useSelector((state) => state.leaders.leaders)

    //for react-redux-from
     const resetFeedbackForm = () => {dispatch(actions.reset('feedback'))};

    const HomePage = () => {
      return(
        <Home 
        dish={dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        promotion={promotions.filter((promo) => promo.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
    />
      );
    }
    const DishWithId = () => {
      const { dishId } = useParams();
      return(
          <DishDetail dish={dishes.filter((dish) => dish.id === parseInt(dishId,10))[0]} 
          // isLoading={dishes.isLoading}
          // errMess={dishes.errMess}
            comments={comments.filter((comment) => comment.dishId === parseInt(dishId,10))} />
      );
    };
    
    return (
      <div>
        {/* <Header/> */}
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Routes>
          <Route  path="/" element={<Header />}>
             <Route index element={<HomePage/>}/>
             <Route exact path='menu' element={<Menu dishes={dishes} />} />
             <Route path='/menu/:dishId' element={<DishWithId/>} />
             <Route  path='aboutus'  element={<AboutUs leaders={leaders}/>}/>
             <Route  path='contactus'element={<ContactUs resetFeedbackForm={resetFeedbackForm} />}/>
             {/* <Redirect to="/home" /> */}
             <Route path="*" to='home'/>
          </Route>
        </Routes>
        <Footer/>
      </div>
    );
}

export default Main;