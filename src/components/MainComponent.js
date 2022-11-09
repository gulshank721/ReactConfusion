import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import {Route , useParams} from 'react-router-dom';
import { Routes} from "react-router-dom";
import ContactUs from './ContactUsComponent';
import AboutUs from './AboutComponent';
import { useSelector, useDispatch } from 'react-redux'

function Main() {
  
 
  // HomePage(){
  //   return(
  //    <Home/>
  //   );
  // }
  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId});
  // }
  // getting store values
   
  
    const dishes = useSelector((state) => state.dcpl.dishes)
    const comments = useSelector((state) => state.dcpl.comments)
    const promotions = useSelector((state) => state.dcpl.promotions)
    const leaders = useSelector((state) => state.dcpl.leaders)


    const HomePage = () => {
      return(
        <Home 
        dish={dishes.filter((dish) => dish.featured)[0]}
        promotion={promotions.filter((promo) => promo.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
    />
      );
    }
    const DishWithId = () => {
      const { dishId } = useParams();
      return(
          <DishDetail dish={dishes.filter((dish) => dish.id === parseInt(dishId,10))[0]} 
            comments={comments.filter((comment) => comment.dishId === parseInt(dishId,10))} />
      );
    };
    
    return (
      <div>
        {/* <Header/> */}
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
        <Routes>
          <Route path="/" element={<Header />}>
             <Route index path='home' element={<HomePage/>}/>
             <Route exact path='menu' element={<Menu dishes={dishes} />} />
             <Route path='/menu/:dishId' element={<DishWithId/>} />
             <Route  path='aboutus'  element={<AboutUs leaders={leaders}/>}/>
             <Route  path='contactus'  element={<ContactUs/>}/>
             {/* <Redirect to="/home" /> */}
             <Route path="*" to='home'/>
          </Route>
        </Routes>
        <Footer/>
      </div>
    );
}

export default Main;